const Order = require("../modles/order"); // আপনার Order Model-এর পথ দিন
const Product = require("../modles/product"); // Product Model

// ==========================================
// 1. CREATE NEW ORDER (User)
// ==========================================
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.userId; // Auth Middleware থেকে আসা User ID

    console.log(userId, "user id");

    const {
      products,
      shippingAddress,
      paymentMethod,
      shippingCost = 0,
      discount = 0,
    } = req.body;

    console.log(
      "Order create data :",
      products,
      shippingAddress,
      paymentMethod,
      shippingCost,
      discount,
    );

    if (!products || products.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No order items found" });
    }

    let subtotal = 0;
    const orderProducts = [];

    // প্রোডাক্ট সার্ভার সাইডে যাচাই এবং Subtotal হিসাব
    for (const item of products) {
      const dbProduct = await Product.findById(item.productId);
      if (!dbProduct) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.productId}`,
        });
      }

      // স্টক যাচাই (Optional validation)
      if (dbProduct.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${dbProduct.name}`,
        });
      }

      const itemPrice = dbProduct.price; // সার্ভার থেকে সঠিক দাম নেওয়া
      subtotal += itemPrice * item.quantity;

      orderProducts.push({
        productId: item.productId,
        quantity: item.quantity,
        price: itemPrice,
      });
    }

    const totalPrice = subtotal + Number(shippingCost) - Number(discount);

    // পেমেন্ট মেথড অনুযায়ী প্রাথমিক স্ট্যাটাস সেটআপ
    const isOnlinePayment = paymentMethod.toLowerCase() !== "cod";
    console.log(isOnlinePayment);

    const newOrder = new Order({
      userId,
      products: orderProducts,
      shippingAddress,
      pricing: {
        subtotal,
        shippingCost,
        discount,
        totalPrice,
      },
      paymentInfo: {
        method: paymentMethod.toLowerCase(),
        status: "Pending",
        transactionId: null,
      },
      orderStatus: "Pending",
    });

    console.log(newOrder, "nw Order");

    const savedOrder = await newOrder.save();

    // IF ONLINE PAYMENT: পেমেন্ট গেটওয়ে জেনারেট করার রেসপন্স
    if (isOnlinePayment) {
      // এখানে bKash / SSLCommerz / SurjoPay-এর API কল করে Payment Link তৈরি করবেন
      return res.status(201).json({
        success: true,
        message: "Order created. Proceed to payment.",
        paymentRequired: true,
        orderId: savedOrder._id,
        totalPrice: savedOrder.pricing.totalPrice,
        // paymentUrl: "https://sandbox.sslcommerz.com/..."
      });
    }

    // IF CASH ON DELIVERY (COD)
    res.status(201).json({
      success: true,
      message: "Order placed successfully with Cash on Delivery!",
      paymentRequired: false,
      order: savedOrder,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// 2. GET LOGGED-IN USER ORDERS (User)
// ==========================================
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate("products.productId", "name image price")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// 3. GET SINGLE ORDER DETAILS (User/Admin)
// ==========================================
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "name email phone")
      .populate("products.productId", "name image price");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // ইউজার নিজের অর্ডার নাকি অ্যাডমিন তা চেক করা
    if (
      order.userId._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// 4. GET ALL ORDERS (Admin Only)
// ==========================================
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// 5. UPDATE ORDER STATUS & PAYMENT (Admin Only)
// ==========================================
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus, transactionId } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentInfo.status = paymentStatus;
    if (transactionId) order.paymentInfo.transactionId = transactionId;

    const updatedOrder = await order.save();
    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// 6. CANCEL ORDER (User / Admin)
// ==========================================
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Shipped হওয়ার পর ক্যানসেল করা যাবে না
    if (order.orderStatus === "Shipped" || order.orderStatus === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel an order that is already shipped or delivered",
      });
    }

    order.orderStatus = "Cancelled";
    await order.save();

    res
      .status(200)
      .json({ success: true, message: "Order cancelled successfully", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
