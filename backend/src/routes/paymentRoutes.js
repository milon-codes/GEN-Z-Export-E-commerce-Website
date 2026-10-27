const express = require("express");
const router = express.Router();
const SSLCommerzPayment = require("sslcommerz-lts");

const store_id = process.env.SSL_STORE_ID;
const store_passwd = process.env.SSL_STORE_PASSWORD;
// Boolean conversion ensure করা হচ্ছে
const is_live = process.env.IS_LIVE === "true";

// 💳 ১. পেমেন্ট ইনিশিয়ালাইজেশন (SSLCommerz & COD)
router.post("/initiate-payment", async (req, res) => {
  const { products, shippingAddress, totalAmount, paymentMethod } = req.body;
  const tran_id = "TRAN_" + Date.now(); // Unique Transaction ID

  // 🚚 Cash on Delivery চেক
  if (paymentMethod === "COD") {
    // TODO: MongoDB-তে অর্ডার সেভ করুন (Payment Status: Pending)
    return res.status(200).json({
      isCOD: true,
      message: "Order placed successfully via Cash on Delivery",
    });
  }

  const data = {
    total_amount: totalAmount,
    currency: "BDT",
    tran_id: tran_id,
    success_url: `${process.env.SERVER_URL}/api/payment/success/${tran_id}`,
    fail_url: `${process.env.SERVER_URL}/api/payment/fail/${tran_id}`,
    cancel_url: `${process.env.SERVER_URL}/api/payment/cancel/${tran_id}`,
    ipn_url: `${process.env.SERVER_URL}/api/payment/ipn`,
    shipping_method: "Courier",
    product_name:
      products?.map((p) => p.name).join(", ") || "Ecommerce Products",
    product_category: "Ecommerce Products",
    product_profile: "general",
    cus_name: shippingAddress.fullName,
    cus_email: shippingAddress.email || "customer@example.com",
    cus_add1: shippingAddress.fullAddress,
    cus_city: shippingAddress.city,
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: shippingAddress.phone,
    ship_name: shippingAddress.fullName,
    ship_add1: shippingAddress.fullAddress,
    ship_city: shippingAddress.city,
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  try {
    // TODO: MongoDB-তে অর্ডার সেভ করুন (Status: Pending, Payment Status: Unpaid)

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then((apiResponse) => {
      let GatewayPageURL = apiResponse.GatewayPageURL;
      if (GatewayPageURL) {
        return res.status(200).json({ url: GatewayPageURL });
      } else {
        return res.status(400).json({ message: "SSLCommerz Session Failed" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🟢 ২. পেমেন্ট সাকসেস হলে রিডাইরেক্ট
router.post("/success/:tranId", async (req, res) => {
  const { tranId } = req.params;

  // TODO: MongoDB-তে অর্ডার খুঁজুন এবং পেমেন্ট স্ট্যাটাস 'Paid' করুন

  res.redirect(`${process.env.CLIENT_URL}/payment-success?tranId=${tranId}`);
});

// 🔴 ৩. পেমেন্ট ব্যর্থ বা ক্যানসেল হলে
router.post("/fail/:tranId", async (req, res) => {
  res.redirect(`${process.env.CLIENT_URL}/checkout?status=failed`);
});

router.post("/cancel/:tranId", async (req, res) => {
  res.redirect(`${process.env.CLIENT_URL}/checkout?status=cancelled`);
});

module.exports = router;
