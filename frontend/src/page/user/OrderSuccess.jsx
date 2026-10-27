import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaCopy,
  FaClipboardCheck,
  FaShoppingBag,
  FaPrint,
  FaTruck,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaUser,
  FaCalendarAlt,
  FaCreditCard,
  FaBoxOpen,
  FaArrowRight,
  FaHome,
} from "react-icons/fa";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Router Location state থেকে ডাটা রিসিভ করা (যদি নেভিগেট করার সময় ডাটা পাঠানো হয়)
  // ডাটা না থাকলে ডেমো/ফলব্যাক ডাটা শো করবে
  const orderData = location.state?.order || {
    orderId: "ORD-" + Math.floor(100000 + Math.random() * 900000),
    createdAt: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending", // 'Paid' or 'Pending'
    shippingMethod: "Standard Express Delivery",
    customer: {
      name: "Md. Milon Miah",
      phone: "+880 1782-671469",
      email: "mdmilonmiah20885@gmail.com",
      address: "Purun Laxmipur, Kamarpara, Sadullapur, Gaibandha",
      city: "Gaibandha",
    },
    items: [
      {
        id: "1",
        name: "Premium Oversized Streetwear Hoodie",
        price: 1450,
        quantity: 1,
        size: "XL",
        color: "Black",
        image:
          "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=60",
      },
      {
        id: "2",
        name: "Casual Cotton Slim Fit Chino Pants",
        price: 950,
        quantity: 2,
        size: "L",
        color: "Navy Blue",
        image:
          "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=60",
      },
    ],
    subtotal: 3350,
    shippingFee: 120,
    discount: 150,
    grandTotal: 3320,
  };

  // Order ID কপি করার ফাংশন
  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderData.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ইনভয়েস প্রিন্ট করার ফাংশন
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 pt-24 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8 print:p-0 print:m-0">
        {/* ==================== Top Success Header ==================== */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none text-center relative overflow-hidden">
          {/* Subtle Decorative Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl pointer-events-none rounded-full"></div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Animated Check Icon */}
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-500 rounded-full flex items-center justify-center border-4 border-emerald-50 dark:border-emerald-900/30 mb-4 shadow-inner">
              <FaCheckCircle className="text-4xl animate-bounce" />
            </div>

            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/40 mb-2">
              Order Confirmed
            </span>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Thank You For Your Order!
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 max-w-md mt-2">
              We have received your order and are preparing it for shipment. A
              confirmation email has been sent to your email address.
            </p>

            {/* Order ID Badge with Copy Button */}
            <div className="mt-6 inline-flex items-center gap-2 bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 px-4 py-2 rounded-2xl">
              <span className="text-xs text-slate-400 font-medium">
                Order ID:
              </span>
              <span className="text-xs font-black text-slate-900 dark:text-white tracking-wider">
                #{orderData.orderId}
              </span>
              <button
                onClick={handleCopyOrderId}
                className="ml-2 text-slate-400 hover:text-[#C5A059] transition-colors p-1"
                title="Copy Order ID"
              >
                {copied ? (
                  <FaClipboardCheck className="text-emerald-500 text-sm" />
                ) : (
                  <FaCopy className="text-sm" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ==================== Grid Section: Details & Items ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side: Order & Customer Information (1 Col on LG) */}
          <div className="space-y-6">
            {/* Delivery Details Card */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-zinc-800">
                <FaTruck className="text-[#C5A059]" /> Shipping Info
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <FaUser className="text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-zinc-200">
                      {orderData.customer.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <FaPhoneAlt className="text-slate-400 mt-0.5 shrink-0" />
                  <p className="text-slate-600 dark:text-zinc-400">
                    {orderData.customer.phone}
                  </p>
                </div>

                {orderData.customer.email && (
                  <div className="flex items-start gap-2.5">
                    <FaEnvelope className="text-slate-400 mt-0.5 shrink-0" />
                    <p className="text-slate-600 dark:text-zinc-400 break-all">
                      {orderData.customer.email}
                    </p>
                  </div>
                )}

                <div className="flex items-start gap-2.5">
                  <FaMapMarkerAlt className="text-slate-400 mt-0.5 shrink-0" />
                  <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
                    {orderData.customer.address}, {orderData.customer.city}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment & Order Info Card */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-zinc-800">
                <FaCreditCard className="text-[#C5A059]" /> Payment Details
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Date:</span>
                  <span className="font-semibold text-slate-800 dark:text-zinc-200 flex items-center gap-1">
                    <FaCalendarAlt size={10} className="text-[#C5A059]" />
                    {orderData.createdAt}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Method:</span>
                  <span className="font-semibold text-slate-800 dark:text-zinc-200">
                    {orderData.paymentMethod}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Status:</span>
                  <span
                    className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                      orderData.paymentStatus === "Paid"
                        ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
                        : "bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {orderData.paymentStatus}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Shipping Option:</span>
                  <span className="font-semibold text-slate-800 dark:text-zinc-200">
                    {orderData.shippingMethod}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Ordered Products & Pricing Summary (2 Cols on LG) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Products List Card */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-5 md:p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
                <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <FaBoxOpen className="text-[#C5A059]" /> Order Items (
                  {orderData.items.length})
                </h3>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-zinc-800/60">
                {orderData.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-14 h-14 bg-slate-100 dark:bg-zinc-800 rounded-xl overflow-hidden border border-slate-200/50 dark:border-zinc-800 shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 space-y-1">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-zinc-100 truncate">
                          {item.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400">
                          {item.size && (
                            <span className="bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded font-medium text-slate-600 dark:text-zinc-300">
                              Size: {item.size}
                            </span>
                          )}
                          {item.color && (
                            <span className="bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded font-medium text-slate-600 dark:text-zinc-300">
                              Color: {item.color}
                            </span>
                          )}
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-xs font-black text-slate-900 dark:text-zinc-100">
                        {item.price * item.quantity} BDT
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-[10px] text-slate-400">
                          ({item.price} x {item.quantity})
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation Summary */}
              <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800 dark:text-zinc-200">
                    {orderData.subtotal} BDT
                  </span>
                </div>

                <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                  <span>Delivery Charge</span>
                  <span className="font-semibold text-slate-800 dark:text-zinc-200">
                    +{orderData.shippingFee} BDT
                  </span>
                </div>

                {orderData.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Discount</span>
                    <span className="font-semibold">
                      -{orderData.discount} BDT
                    </span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-baseline">
                  <span className="text-xs font-black text-slate-950 dark:text-white uppercase tracking-wider">
                    Total Amount
                  </span>
                  <span className="text-base sm:text-lg font-black text-[#C5A059]">
                    {orderData.grandTotal} BDT
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation & Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 print:hidden">
              <button
                onClick={handlePrint}
                className="w-full sm:w-auto px-5 py-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-200 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <FaPrint /> Print Receipt
              </button>

              <Link
                to="/"
                className="w-full sm:flex-1 py-3 bg-[#C5A059] hover:bg-[#b08e4f] text-zinc-950 text-xs font-black rounded-xl transition-all shadow-md shadow-[#C5A059]/10 flex items-center justify-center gap-2"
              >
                <FaHome /> Continue Shopping <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
