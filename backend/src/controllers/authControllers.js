const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../modles/user");
const { successResponse, errorResponse } = require("./responseController");
const { jwtSecretKey, jwtRefreshSecretKey } = require("../secret");
const {
  createJsonWebToken,
  verifyJsonWebToken,
} = require("../helper/jsonwebtoken");
const { setAuthCookie, clearAuthCookie } = require("../helper/cookieHelper");
const sendEmail = require("../helper/email");

const {
  activateEmailTemplate,
  resetEmailTemplate,
} = require("../helper/emailTemplate");

// 1. user register handle
const registerHandle = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone)
      throw createError(401, "All Input required");

    const userExists = await User.exists({ email });

    if (userExists) {
      throw createError(
        409,
        "User with this Email already exist. please login",
      );
    }

    // ৬ ডিজিটের ওটিপি স্ট্রিং
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // create  token
    const token = createJsonWebToken(
      { name, email, password, phone, otp },
      jwtSecretKey,
      "5m",
    );

    console.log("Generated token:", token);
    console.log("Generated OTP:", otp);
    console.log("user email:", email);

    const emailData = {
      email,
      subject: "Account Activation OTP Code",
      html: activateEmailTemplate(name, otp),
    };

    // send email with nodemailer
    try {
      await sendEmail(emailData);
    } catch (emailError) {
      console.log(emailError);

      next(createError(500, "Failed to send verification email."));
      return;
    }

    setAuthCookie(res, "activation_token", token, 5);

    successResponse(res, {
      status: 201,
      message: `To complete your registration, please enter the verification code we just sent to ${email}. Thank you for joining us!`,
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

// 2. user verification
const verifyOtp = async (req, res, next) => {
  try {
    const { userOtp } = req.body;
    // ১. হাইফেন বাদ দিয়ে কুকির নাম ঠিক করা হয়েছে
    const token = req.cookies.activation_token;
    console.log("token", token);

    if (!userOtp) throw createError(401, "OTP not found");
    if (!token) throw createError(401, "Token not found");

    let decoded;
    try {
      // ২. এখান থেকে await সরিয়ে নেওয়া হয়েছে
      decoded = verifyJsonWebToken(token, jwtSecretKey);
    } catch (error) {
      throw createError(400, "Session time expired. Please register again.");
    }

    const { name, email, password, phone, otp } = decoded.payload;

    console.log("Decoded OTP from Token:", otp);
    console.log("User Input OTP:", userOtp);

    // টাইপ অমিল এড়াতে দুটাকেই স্ট্রিং এবং ট্রিম (Trim) করে তুলনা করা হয়েছে
    if (String(userOtp).trim() !== String(otp).trim()) {
      throw createError(
        400,
        "OTP code does not match, please enter current OTP code.",
      );
    }

    const userExist = await User.findOne({ email });
    if (userExist)
      throw createError(400, "User with this email already exists.");

    const newUser = new User({
      name,
      email,
      password,
      phone,
      isVerified: true,
      authProvider: "local",
    });
    await newUser.save();

    clearAuthCookie(res, "activation_token");

    successResponse(res, {
      status: 201,
      message: "Registration successful and user verified.",
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

// 3. login handler
const loginHandle = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "email or password Required!" });
    }

    // ১. ইউজার চেক
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email and password" });
    }

    // ২. ইমেইল ভেরিফিকেশন চেক
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "দয়া করে আগে আপনার ইমেইলটি ভেরিফাই করুন!",
      });
    }

    // ৩. পাসওয়ার্ড চেক
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "ভুল ইমেইল অথবা পাসওয়ার্ড!" });
    }

    // ৪. পেলোড ডাটা (ইউজার ইনফো)
    const tokenPayload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    // ৫. Access Token তৈরি ও কুকি সেট (মেয়াদ: ১ দিন = ১৪৪০ মিনিট)
    const accessToken = createJsonWebToken(tokenPayload, jwtSecretKey, "1d");
    setAuthCookie(res, "access_token", accessToken, 1440);

    // ৬. Refresh Token তৈরি ও কুকি সেট (মেয়াদ: ৭ দিন = ১০০৮০ মিনিট)
    // নোট: রিফ্রেশ টোকেনের সিক্রেট কি আলাদা (jwtRefreshSecretKey) হওয়া ভালো, না থাকলে একই কি ব্যবহার করতে পারেন
    const refreshToken = createJsonWebToken(
      tokenPayload,
      jwtRefreshSecretKey,
      "7d",
    );
    setAuthCookie(res, "refresh_token", refreshToken, 10080);

    // ৭. রেসপন্স পাঠানো (নিরাপত্তার জন্য রেসপন্স থেকে পাসওয়ার্ড বাদ দেওয়া হয়েছে)
    user.password = undefined;

    successResponse(res, {
      status: 200,
      message: "Login Successfully",
      payload: { user },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "সার্ভারে কোনো সমস্যা হয়েছে!",
    });
  }
};

// 4. user logout
const userLogout = (req, res, next) => {
  try {
    clearAuthCookie(res, "access_token");

    successResponse(res, {
      status: 200,
      message: "Logout sucessfull",
    });
  } catch (error) {
    next(error);
  }
};

// 5. get user profile handler
const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    if (!userId) {
      return res.status(401).json({ message: "user id is Requierd!" });
    }

    // ১. ইউজার ডাটাবেজে আছে কিনা চেক করা
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }

    // ৫. রেসপন্স পাঠানো
    res.status(200).json({
      success: true,
      message: "Profile returned successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

// 6. user profile update
const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { name, phone, address } = req.body;

    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true },
    );

    if (!updatedUser) throw new Error("User not found");

    successResponse(res, {
      status: 200,
      message: "User Update sucessfull",
      payload: { updatedUser },
    });
  } catch (error) {
    next(error);
  }
};

// 7. update user password
const updateUserPassword = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword)
      throw new Error("password is required");

    const user = await User.findById(userId).select("+password");
    if (!user) throw createError(404, "user not found");

    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) throw createError(400, "password do not match");

    user.password = newPassword;
    await user.save();

    successResponse(res, {
      status: 200,
      message: "Password Chanage Successfully",
    });
  } catch (error) {
    next(error);
  }
};

// 8. reset Password step 1
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) throw createError(401, "email is required");

    const user = await User.findOne({ email });
    if (!user) throw createError(404, "User not found");

    const otp = Math.floor(100000 + Math.random() * 90000).toString();
    console.log("forgot otp", otp);

    user.resetOtp = otp;
    user.resetExpires = Date.now() + 5 * 60 * 1000; // 5 minites

    await user.save();

    // send email

    const emailData = {
      email,
      subject: "Password Reset OTP",
      html: resetEmailTemplate(otp),
    };

    try {
      await sendEmail(emailData);
    } catch (emailError) {
      next(createError(500, "Failed to send varification email."));
      return;
    }

    successResponse(res, {
      status: 200,
      message: "Plase go to your Email send a Verification code.",
    });
  } catch (error) {
    next(error);
  }
};

// reset Password  step 2
const verifyResetOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) throw createError(401, "OTP is required");

    const user = await User.findOne({
      email,
      resetOtp: otp,
      resetExpires: { $gt: Date.now() },
    });

    if (!user)
      throw createError(404, "otp do not match and otp time is exparire");
    console.log("reset user", user);

    user.resetOtp = undefined;
    user.resetExpires = undefined;
    await user.save();

    // create reset tokrn
    const resetToken = await jwt.sign(
      { id: user._id, purpose: "password_reset" },
      jwtSecretKey,
      { expiresIn: "20m" },
    );

    successResponse(res, {
      status: 200,
      message: "OTP Code Verify successfully.",
      payload: { resetToken },
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

// reset Password  step 3
const resetPassword = async (req, res, next) => {
  try {
    const { resetToken, newPassword } = req.body;
    console.log(resetToken, newPassword, "data");

    if (!resetToken || !newPassword)
      throw createError(401, "New Password and Reset token is required");

    const decoded = await jwt.verify(resetToken, jwtSecretKey);
    if (!decoded) throw createError(404, "Reset time is up");
    if (decoded.purpose !== "password_reset")
      throw createError(404, "Invalid token");

    const user = await User.findById(decoded.id);

    if (!user) throw createError(404, "User not found");

    user.password = newPassword;
    await user.save();

    successResponse(res, {
      status: 200,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Google / Facebook Callback Handler
const handleOAuthCallback = (req, res) => {
  try {
    // JWT টোকেন তৈরি
    const token = jwt.sign({ userId: req.user._id }, jwtSecretKey, {
      expiresIn: "7d",
    });

    // HTTP-Only Cookie সেট করা
    res.cookie("token", token, COOKIE_OPTIONS);

    // ফ্রন্টএন্ডে রিডাইরেক্ট
    res.redirect("http://localhost:5173/oauth-success");
  } catch (err) {
    console.error("OAuth Callback Error:", err);
    res.redirect("http://localhost:5173/login?error=oauth_failed");
  }
};

module.exports = {
  registerHandle,
  verifyOtp,
  loginHandle,
  userLogout,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  handleOAuthCallback,
};
