const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
const passport = require("passport");
require("dotenv").config();

const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const orderRouter = require("./routes/orderRoutes");
const paymentRouter = require("./routes/paymentRoutes");
const chatRouter = require("./routes/aiRoutes");
const bannerRouter = require("./routes/bannerRoute");
const adminRouter = require("./routes/adminRoutes");

const { errorResponse } = require("./controllers/responseController");
const { clientURL } = require("./secret");

require("./config/passport"); // পাসপোর্ট কনফিগ ফাইলটি লোড করলাম

const app = express();

// use Middleware
app.use(morgan("dev"));

app.use(cookieParser());

//
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://gen-z-export.vercel.app/",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // রিকোয়েস্টের অরিজিন যদি লিস্টে থাকে অথবা লোকাল/টুলস থেকে (no origin) হয়
//       if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("CORS Blocked by Admin"));
//       }
//     },
//     credentials: true,
//   }),
// );

app.use(
  cors({
    origin: clientURL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize()); // পাসপোর্ট চালু করলাম

// home route
app.get("/", (req, res) => {
  res.send("server is running...");
});

//  Routers
// auth route
app.use("/api/auth", authRouter);

// Products Routers
app.use("/api/products", productRouter);

// products Order routes
app.use("/api/orders", orderRouter);

// payments routes
app.use("/api/payment", paymentRouter);

// ai chat route
app.use("/api/ai", chatRouter);

// banner slider route
app.use("/api/banner", bannerRouter);

// admin controller route
app.use("/api/admin", adminRouter);

// cliend errror handling
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

// server error handling → all the error
app.use((err, req, res, next) => {
  return errorResponse(res, {
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
