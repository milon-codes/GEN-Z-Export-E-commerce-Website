const bcryptjs = require("bcryptjs");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "The length of user name can be minimum 3 characters."],
      maxlength: [31, "The length of user name can be maximum 31 characters."],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      trim: true,
      minlength: [6, "The length of password can be minimum 6 characters."],
      select: false, // ডাটা কোয়েরি করার সময় পাসওয়ার্ড হাইড থাকবে
    },
    phone: {
      type: String,
      unique: true,
      sparse: true, // 💡 এটি খুবই গুরুত্বপূর্ণ! ওঅথ ইউজারদের ফোন নম্বর না থাকলে যাতে ডুপ্লিকেট এরর না আসে
      validate: {
        validator: function (v) {
          // যদি নম্বর দেওয়া হয়, তবেই কেবল ১১ ডিজিটের বাংলাদেশী ফরম্যাট চেক করবে
          if (!v) return true;
          return /^01\d{9}$/.test(v);
        },
        message: (props) =>
          `${props.value} Not a valid Bangladeshi phone number! Please provide an 11-digit number starting with 01.`,
      },
    },
    address: {
      type: String,
      trim: true,
    },
    avatar: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
    googleId: {
      type: String,
      default: null,
    },
    facebookId: {
      type: String,
      default: null,
    },
    authProvider: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    totalSpent: {
      type: Number,
      default: 0,
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    loyaltyPoints: {
      type: Number,
      default: 0,
    },
    notifications: [
      {
        title: String,
        message: String,
        isRead: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    fcmToken: {
      type: String,
      default: null,
    },
    otp: {
      type: String,
      select: false,
    },
    resetOtp: {
      type: String,
      select: false,
    },
    resetExpires: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true },
);

// 💡 পাসওয়ার্ড হ্যাশ করার সঠিক মিডলওয়্যার (Mongoose modern async/await)
userSchema.pre("save", async function () {
  // যদি পাসওয়ার্ড মডিফাই না হয় অথবা পাসওয়ার্ড ফিল্ডে ডাটা না থাকে
  if (!this.isModified("password") || !this.password) {
    return; // next() লেখার দরকার নেই, শুধু return করে দিন
  }

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

// 🔹 Password Compare Method
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcryptjs.compare(enteredPassword, this.password);
};

const User = model("User", userSchema);

module.exports = User;
