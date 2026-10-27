const passport = require("passport");
const User = require("../modles/user"); // আপনার ইউজার মডেলের পাথ
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

// ==========================================
// ১. গুগলের জন্য সেটিংস (Google Strategy)
// ==========================================
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email =
          profile.emails && profile.emails[0] ? profile.emails[0].value : null;

        if (!email) {
          return done(
            new Error("গুগল অ্যাকাউন্ট থেকে কোনো ইমেইল পাওয়া যায়নি।"),
            null,
          );
        }

        // ইমেইল দিয়ে ডাটাবেজে ইউজার খুঁজছি
        let user = await User.findOne({ email: email });

        if (user) {
          // ইউজার যদি আগে সাধারণ সাইনআপ করে থাকে এবং ভেরিফাইড না থাকে, তবে ওথ দিয়ে আসায় ভেরিফাইড করে দিচ্ছি
          if (!user.isVerified) {
            user.isVerified = true;
            await user.save();
          }
          return done(null, user);
        }

        // ইউজার না থাকলে নতুন অ্যাকাউন্ট তৈরি করছি
        user = new User({
          name: profile.displayName,
          email: email,
          provider: "google",
          googleId: profile.id,
          isVerified: true, // গুগল থেকে আসায় সরাসরি ভেরিফাইড ট্রু (true) করে দেওয়া হলো
        });

        await user.save();
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    },
  ),
);

// ==========================================
// ২. ফেসবুকের জন্য সেটিংস (Facebook Strategy)
// ==========================================
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/api/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails", "name", "photos"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // ফেসবুক ইমেইল না দিলে ব্যাকআপ হিসেবে আইডি দিয়ে ডামি ইমেইল বানাচ্ছি
        const email =
          profile.emails && profile.emails[0]
            ? profile.emails[0].value
            : `${profile.id}@facebook.com`;

        // ইমেইল অথবা ফেসবুক আইডি দিয়ে ডাটাবেজে ইউজার খুঁজছি
        let user = await User.findOne({
          $or: [{ email: email }, { facebookId: profile.id }],
        });

        if (user) {
          // ইউজার আগে তৈরি করা থাকলে এবং ভেরিফাইড না থাকলে ওথ-এর কারণে ভেরিফাইড করে দিচ্ছি
          if (!user.isVerified) {
            user.isVerified = true;
            await user.save();
          }
          return done(null, user);
        }

        // ইউজার না থাকলে নতুন অ্যাকাউন্ট তৈরি করছি
        user = new User({
          name: profile.displayName,
          email: email,
          provider: "facebook",
          facebookId: profile.id,
          isVerified: true, // ফেসবুক থেকে আসায় সরাসরি ভেরিফাইড ট্রু (true) করে দেওয়া হলো
        });

        await user.save();
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    },
  ),
);
