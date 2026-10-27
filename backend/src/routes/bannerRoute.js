const express = require("express");
const Banners = require("../modles/banner");
const router = express.Router();

// ----------------------------------------------------------------
// 1. GET ALL BANNERS -> GET /api/banner
// ----------------------------------------------------------------
router.get("/", async (req, res, next) => {
  try {
    const slides = await Banners.find();

    if (!slides) throw new Error("Slide not found");

    res.status(200).json({
      success: true,
      message: "Slides were returned successfully",
      slides,
    });
  } catch (error) {
    next(error);
  }
});

// ----------------------------------------------------------------
// 2. CREATE BANNER -> POST /api/banner/create
// ----------------------------------------------------------------
router.post("/create", async (req, res, next) => {
  try {
    // 🟢 এখানে নতুন সব ফিল্ড (isActive, bgColor, ইত্যাদি) req.body থেকে নিয়ে আসা হলো
    const {
      tagline,
      title,
      description,
      buttonText,
      buttonLink,
      bgImage,
      badge,
      isActive,
      bgColor,
      textColor,
      fontFamily,
      alignment,
      autoPlaySpeed,
    } = req.body;

    // রিকোয়ার্ড ফিল্ড ভ্যালিডেশন (অপশনাল ফিল্ডগুলো বাদ দিয়ে শুধু মেইন ফিল্ড চেক করা হলো)
    if (!title || !description || !buttonText || !buttonLink) {
      throw new Error("Required fields are missing.");
    }

    // 🟢 ডাটাবেজে নতুন প্রপার্টিগুলোসহ অবজেক্ট তৈরি করা হচ্ছে
    const savedSlide = await Banners.create({
      tagline,
      title,
      description,
      buttonText,
      buttonLink,
      bgImage,
      badge,
      isActive,
      bgColor,
      textColor,
      fontFamily,
      alignment,
      autoPlaySpeed,
    });

    if (!savedSlide) throw new Error("Banner creation failed");

    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data: savedSlide,
    });
  } catch (error) {
    next(error);
  }
});

// ----------------------------------------------------------------
// 3. UPDATE BANNER -> PUT /api/banner/update/:id
// ----------------------------------------------------------------
router.put("/update/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    // 🟢 এখানেও আপডেট করার সময় নতুন ফিল্ডগুলো রিসিভ করা হলো
    const {
      tagline,
      title,
      description,
      buttonText,
      buttonLink,
      bgImage,
      badge,
      isActive,
      bgColor,
      textColor,
      fontFamily,
      alignment,
      autoPlaySpeed,
    } = req.body;

    if (!id) throw new Error("ID is required for update");

    // 🟢 ডাটাবেজে নতুন ডাটা আপডেট করার অবজেক্ট
    const updatedBanner = await Banners.findByIdAndUpdate(
      id,
      {
        tagline,
        title,
        description,
        buttonText,
        buttonLink,
        bgImage,
        badge,
        isActive,
        bgColor,
        textColor,
        fontFamily,
        alignment,
        autoPlaySpeed,
      },
      { new: true, runValidators: true },
    );

    if (!updatedBanner) throw new Error("Banner not found or update failed");

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: updatedBanner,
    });
  } catch (error) {
    next(error);
  }
});

// ----------------------------------------------------------------
// 4. DELETE BANNER -> DELETE /api/banner/delete/:id
// ----------------------------------------------------------------
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) throw new Error("ID is required for deletion");

    const deletedBanner = await Banners.findByIdAndDelete(id);

    if (!deletedBanner) throw new Error("Banner not found or delete failed");

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
