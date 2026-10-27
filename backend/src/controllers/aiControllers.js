const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// -------------------------------------------------------------
// FEATURE 1: Admin Product Profile Generator (FIXED MODEL NAMES)
// -------------------------------------------------------------
exports.generateAdminProductProfile = async (req, res) => {
  try {
    const { productName } = req.body;

    if (!productName || typeof productName !== "string") {
      return res.status(400).json({
        success: false,
        message: "Valid product name is required.",
      });
    }

    const prompt = `Generate a concise product profile for: ${productName}`;

    const config = {
      systemInstruction: `You are an e-commerce catalog generator. Respond ONLY with valid JSON.
      JSON structure:
      {
        "title": "String",
        "description": "Short 2-3 sentence description",
        "sizes": ["S", "M", "L", "XL"],
        "tags": ["tag1", "tag2", "tag3"],
        "fbCaption": "Short FB post with emojis"
      }`,
      responseMimeType: "application/json",
    };

    let response;

    // Primary & Fallback Models (কাস্টমার চ্যাটের মতো একই কার্যকরী মডেল ব্যবহার করা হয়েছে)
    try {
      // ⚡ Primary Model
      response = await ai.models.generateContent({
        model: "models/gemini-flash-latest",
        contents: prompt,
        config: config,
      });
    } catch (primaryError) {
      console.warn(
        "Admin generator primary model busy, switching to fallback...",
        primaryError.message,
      );

      // 🛡️ Fallback Model
      response = await ai.models.generateContent({
        model: "models/gemini-3.5-flash-lite",
        contents: prompt,
        config: config,
      });
    }

    // Safe JSON Parsing Logic
    let parsedData;
    try {
      const cleanJsonString = response.text.replace(/```json|```/g, "").trim();
      parsedData = JSON.parse(cleanJsonString);
    } catch (parseError) {
      console.error("Raw AI Output failed to parse:", response.text);
      throw new Error("AI returned malformed JSON response.");
    }

    return res.status(200).json({
      success: true,
      data: parsedData,
    });
  } catch (error) {
    console.error("Admin Generator Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate product profile.",
    });
  }
};

// -------------------------------------------------------------
// FEATURE 2 & 3: Customer Smart Chatbot (Stream + Guardrails + DB Context)
// -------------------------------------------------------------
exports.streamCustomerChat = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res
      .status(400)
      .json({ success: false, message: "Valid prompt is required." });
  }

  // SSE Headers Setup
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // 🛡️ FEATURE 3: System Instruction / Guardrails Setup
  const systemInstruction = `
    You are 'Gen-Z Store Assistant', a polite, helpful customer support AI for our e-commerce store.
    
    STRICT SECURITY RULES:
    1. You MUST ONLY answer questions related to our products, prices, shopping, order policies, and recommendations.
    2. If the user asks ANYTHING outside e-commerce (e.g. coding tutorials, recipes, politics, math homework, general knowledge), politely decline and state that you can only assist with shopping in our store.
    3. Keep responses helpful, natural, and concise.
  `;

  // 🔍 FEATURE 2: Extract Budget & Fetch Sample Products from Database
  let dbContext = "";
  const priceMatch = prompt.match(/(\d+)\s*(taka|tk|টাকা)/i);

  if (priceMatch) {
    const budget = parseInt(priceMatch[1]);

    const mockDbProducts = [
      {
        title: "Leather Formal Shoes",
        price: 2500,
        link: "/product/leather-shoes",
        image: "https://via.placeholder.com/150",
      },
      {
        title: "Casual Sneakers",
        price: 2800,
        link: "/product/casual-sneakers",
        image: "https://via.placeholder.com/150",
      },
    ].filter((item) => item.price <= budget);

    if (mockDbProducts.length > 0) {
      dbContext =
        `Available products in database matching user budget (${budget} Tk):\n` +
        mockDbProducts
          .map((p) => `- ${p.title} | Price: ${p.price} Tk | Link: ${p.link}`)
          .join("\n");
    }
  }

  const finalPrompt = `
    User Question: "${prompt}"
    ${dbContext ? `Database Information: \n${dbContext}` : ""}
  `;

  // Safe Stream Executor (Primary + Fallback)
  const executeStream = async (modelName) => {
    const responseStream = await ai.models.generateContentStream({
      model: modelName,
      contents: finalPrompt,
      config: { systemInstruction },
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
      }
    }
  };

  try {
    try {
      await executeStream("models/gemini-flash-latest");
    } catch (primaryError) {
      console.warn(
        "Primary model busy, switching to fallback...",
        primaryError.message,
      );
      await executeStream("models/gemini-3.5-flash-lite");
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (finalError) {
    console.error("Chat Stream Error:", finalError);
    res.write(
      `data: ${JSON.stringify({ error: "AI service busy. Try again later." })}\n\n`,
    );
    res.end();
  }
};
