const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // আপনার Product মডেলের সাথে নাম মিলিয়ে নিন
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
          default: 1,
        },
        price: {
          type: Number,
          required: true, // অর্ডার করার মুহূর্তের প্রোডাক্ট প্রাইস (Snapshot)
        },
      },
    ],
    // ডিটেইলড শিপিং ইনফরমেশন
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      fullAddress: { type: String, required: true },
      city: { type: String, required: true },
    },
    // প্রাইসিং ব্রেকডাউন
    pricing: {
      subtotal: { type: Number, required: true },
      shippingCost: { type: Number, required: true, default: 0 },
      discount: { type: Number, default: 0 },
      totalPrice: { type: Number, required: true },
    },
    // পেমেন্ট সংক্রান্ত তথ্য
    paymentInfo: {
      method: {
        type: String,
        enum: ["cod", "online", "bKash", "nagad", "card"],
        lowercase: true,
        required: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Paid", "Failed", "Refunded"],
        default: "Pending",
      },
      transactionId: {
        type: String,
        default: null, // অনলাইন পেমেন্ট হলে ট্রানজেকশন আইডেন্টিফায়ার বসবে
      },
    },
    // অর্ডার প্রসেসিং স্ট্যাটাস
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
