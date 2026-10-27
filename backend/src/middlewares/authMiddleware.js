const jwt = require("jsonwebtoken");
const { jwtSecretKey, jwtRefreshSecretKey } = require("../secret");
const { setAuthCookie } = require("../helper/cookieHelper");
const User = require("../modles/user");
const {
  createJsonWebToken,
  verifyJsonWebToken,
} = require("../helper/jsonwebtoken");

// ১. সাধারণ ইউজার রুট প্রটেক্ট করার জন্য এবং অটো-রিফ্রেশ টোকেন হ্যান্ডেল করার জন্য
const protect = async (req, res, next) => {
  let accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  // যদি দুইটা টোকেনের একটাও না থাকে, তবে সরাসরি লগইন করতে বলবে
  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: "দয়া করে আগে লগইন করুন।" });
  }

  // ক) প্রথমে অ্যাক্সেস টোকেন চেক করা
  if (accessToken) {
    try {
      const decoded = verifyJsonWebToken(accessToken, jwtSecretKey);
      req.user = decoded.payload;
      return next(); // অ্যাক্সেস টোকেন ঠিক থাকলে পরের ফাংশনে চলে যাবে
    } catch (error) {
      console.log("Access token expired, trying refresh token...");
      // অ্যাক্সেস টোকেনের মেয়াদ শেষ হলে কোড নিচে নেমে রিফ্রেশ টোকেন চেক করবে
    }
  }

  // খ) অ্যাক্সেস টোকেন না থাকলে বা এক্সপায়ার হলে রিফ্রেশ টোকেন দিয়ে নতুন অ্যাক্সেস টোকেন বানানো
  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "আপনার সেশন শেষ, দয়া করে আবার লগইন করুন।" });
  }

  try {
    const decodedRefresh = jwt.verify(refreshToken, jwtRefreshSecretKey);

    // ডাটাবেজ থেকে চেক করুন ইউজার এখনো একটিভ আছে কিনা
    const user = await User.findById(decodedRefresh.userId);
    if (!user) {
      return res.status(404).json({ message: "ইউজার খুঁজে পাওয়া যায়নি!" });
    }

    // নতুন অ্যাক্সেস টোকেন জেনারেট করা
    // এখানে আপনার createJsonWebToken ফাংশনটি কল করবেন (যদি গ্লোবাল থাকে বা ইমপোর্ট করা থাকে)
    const tokenPayload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };
    const newAccessToken = createJsonWebToken(tokenPayload, jwtSecretKey, "1d");

    // রাউট ছাড়াই অটোমেটিক ব্যাকগ্রাউন্ডে নতুন কুকি সেট করে দেওয়া (১ দিন = ১৪৪০ মিনিট)
    setAuthCookie(res, "access_token", newAccessToken, 1440);

    req.user = tokenPayload;
    next();
  } catch (refreshError) {
    return res
      .status(403)
      .json({ message: "আপনার রিফ্রেশ টোকেনের মেয়াদও শেষ। আবার লগইন করুন।" });
  }
};

// ২. এডমিন রুট প্রটেক্ট করার জন্য
const isAdmin = async (req, res, next) => {
  // যেহেতু 'protect' মিডলওয়্যারটি আমরা এডমিন রাউটেও আগে রান করব,
  // তাই এখানে আবার টোকেন ভেরিফাই করার দরকার নেই। জাস্ট রোল চেক করলেই হবে।
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "অ্যাক্সেস রিফিউজড! আপনি লগইন করা নন।" });
  }

  // আপনার আগের লজিক অনুযায়ী (যদি role বা isAdmin ব্যবহার করেন)
  // আপনার লগইন কন্ট্রোলারে role পাস করেছিলেন, তাই req.user.role === 'admin' চেক করা ভালো
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "অ্যাক্সেস নাই! শুধুমাত্র এডমিনদের জন্য।" });
  }

  next();
};

// ৩. লগইন থাকলে আবার লগইন/রেজিস্ট্রেশন এবং লগআউট থাকলে আবার লগআউট আটকানোর জন্য
const isLoggedOut = async (req, res, next) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  // যদি কোনো টোকেনই না থাকে (ইউজার অলরেডি লগআউট করা)
  if (!accessToken && !refreshToken) {
    if (req.path === "/logout" || req.path === "/signout") {
      return res.status(400).json({
        message: "আপনি ইতিমধ্যে লগআউট করা আছেন, আবার লগআউট করা সম্ভব না।",
      });
    }
    return next();
  }

  // যদি টোকেন থাকে (ইউজার লগইন করা আছে)
  if (req.path === "/login" || req.path === "/register") {
    return res.status(400).json({
      message: "আপনি অলরেডি লগইন করা আছেন, আবার লগইন করতে পারবেন না।",
    });
  }

  next();
};

module.exports = { protect, isAdmin, isLoggedOut };
