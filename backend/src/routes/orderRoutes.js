const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/orderController");

// আপনার তৈরি করা Auth এবং Admin Middleware ইমপোর্ট করুন
const { protect, isAdmin } = require("../middlewares/authMiddleware");

// User Routes /api/orders
router.post("/create", protect, createOrder); // নতুন অর্ডার করতে
router.get("/my-orders", protect, getMyOrders); // কাস্টমারের নিজের অর্ডারের লিস্ট
router.get("/:id", protect, getOrderById); // নির্দিষ্ট একটা অর্ডারের ডিটেইলস
router.put("/cancel/:id", protect, cancelOrder); // ইউজার অর্ডার ক্যানসেল করতে

// Admin Routes
router.get("/admin/all", protect, isAdmin, getAllOrders); // সব অর্ডার দেখতে (Admin)
router.put("/admin/update/:id", protect, isAdmin, updateOrderStatus); // স্ট্যাটাস পরিবর্তন করতে (Admin)

module.exports = router;
