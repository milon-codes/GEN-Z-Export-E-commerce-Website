// import React, { useState } from "react";

// import { Link } from "react-router-dom";
// import {
//   FaArrowLeft,
//   FaShoppingBag,
//   FaUser,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaCheckCircle,
//   FaTruck,
//   FaMoneyBillWave,
//   FaMobileAlt,
//   FaCopy,
//   FaClipboardCheck,
// } from "react-icons/fa";
// import { useProducts } from "../../context/ProductContext";

// const Checkout = () => {
//   const { cart } = useProducts();
//   // ২. স্টেট ম্যানেজমেন্ট
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     address: "",
//     city: "Dhaka",
//   });

//   const [paymentMethod, setPaymentMethod] = useState("cod"); // cod or mobile_pay
//   const [copied, setCopied] = useState(false);
//   const [orderSuccess, setOrderSuccess] = useState(false);
//   const [orderId, setOrderId] = useState("");

//   // ৩. ডেলিভারি ও অর্ডার হিসাব নিকাশ
//   const subtotal = cart.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0,
//   );
//   const shippingFee = formData.city === "Dhaka" ? 60 : 120; // ঢাকা সিটির ভেতর ৬০ টাকা, বাইরে ১২০ টাকা
//   const total = subtotal + shippingFee;

//   // ইনপুট চেঞ্জ হ্যান্ডলার
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ৪. অর্ডার প্লেস বাটন লজিক
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.phone || !formData.address) {
//       alert("অনুগ্রহ করে নাম, ফোন নাম্বার এবং ঠিকানা সঠিকভাবে পূরণ করুন।");
//       return;
//     }

//     // ইউনিক অর্ডার আইডি জেনারেট (উদা: PKG-2026-X83F)
//     const randomId = `PKG-2026-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
//     setOrderId(randomId);

//     // কার্ট ক্লিয়ার লজিক এখানে কল করবেন (উদা: clearCart())
//     setOrderSuccess(true);
//   };

//   // ৫. কপি ট্র্যাকিং আইডি ফাংশন
//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(orderId);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   /* ==========================================================
//      🎉 অর্ডার কনফার্মেশন সফল হলে এই ডিজাইনটি দেখাবে
//      ========================================================== */
//   if (orderSuccess) {
//     return (
//       <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pt-28 pb-16 px-4 md:px-8 flex items-center justify-center">
//         <div className="max-w-xl w-full bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 p-6 md:p-8 rounded-3xl shadow-lg text-center space-y-6">
//           {/* সাকসেস অ্যানিমেটেড আইকন */}
//           <div className="flex justify-center">
//             <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-full flex items-center justify-center border-4 border-emerald-100 dark:border-emerald-900/30">
//               <FaCheckCircle size={32} className="animate-bounce" />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <h1 className="text-xl md:text-2xl font-black text-slate-950 dark:text-white">
//               Order Confirmed!
//             </h1>
//             <p className="text-xs text-slate-500 dark:text-zinc-400">
//               Thank you,{" "}
//               <span className="font-bold text-slate-800 dark:text-zinc-200">
//                 {formData.name}
//               </span>
//               ! Your order has been placed successfully and is being processed.
//             </p>
//           </div>

//           {/* 🎫 অর্ডার মেমো বক্স */}
//           <div className="bg-slate-50 dark:bg-zinc-950 border border-slate-200/50 dark:border-zinc-800 rounded-2xl p-4 text-left space-y-3.5">
//             <div className="flex items-center justify-between pb-3 border-b border-slate-200/40 dark:border-zinc-800 text-xs">
//               <span className="text-slate-400">Order ID:</span>
//               <div className="flex items-center gap-1.5">
//                 <span className="font-bold text-slate-800 dark:text-zinc-100">
//                   {orderId}
//                 </span>
//                 <button
//                   onClick={copyToClipboard}
//                   className="text-slate-400 hover:text-[#C5A059] transition-colors p-1"
//                   title="Copy ID"
//                 >
//                   {copied ? (
//                     <FaClipboardCheck className="text-emerald-500" />
//                   ) : (
//                     <FaCopy />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <div className="space-y-2 text-xs">
//               <p className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
//                 <FaUser size={10} className="text-[#C5A059]" />{" "}
//                 <strong>Name:</strong> {formData.name}
//               </p>
//               <p className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
//                 <FaPhone size={10} className="text-[#C5A059]" />{" "}
//                 <strong>Phone:</strong> {formData.phone}
//               </p>
//               <p className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
//                 <FaMapMarkerAlt size={10} className="text-[#C5A059]" />{" "}
//                 <strong>Address:</strong> {formData.address}, {formData.city}
//               </p>
//               <p className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
//                 <FaTruck size={10} className="text-[#C5A059]" />{" "}
//                 <strong>Delivery Mode:</strong>{" "}
//                 {formData.city === "Dhaka" ? "Inside Dhaka" : "Outside Dhaka"}{" "}
//                 (2-4 Days)
//               </p>
//             </div>

//             <div className="pt-3 border-t border-slate-200/40 dark:border-zinc-800 flex justify-between items-baseline">
//               <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">
//                 Total Paid/COD:
//               </span>
//               <span className="text-base font-black text-[#C5A059]">
//                 {total} BDT
//               </span>
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-3">
//             <Link
//               to="/"
//               className="flex-1 py-3 bg-zinc-950 dark:bg-zinc-100 hover:bg-zinc-900 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs font-bold rounded-xl transition-all shadow-md"
//             >
//               Continue Shopping
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /* ==========================================================
//      ✍️ অর্ডার সম্পন্ন করার আগের চেকআউট ফর্ম ডিজাইন
//      ========================================================== */
//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pt-28 pb-16 px-4 md:px-8">
//       <div className="max-w-6xl mx-auto">
//         {/* 🏷️ পেজ হেডার */}
//         <div className="mb-8 border-b border-slate-200/40 dark:border-zinc-800 pb-5">
//           <h1 className="text-2xl font-black text-slate-950 dark:text-white">
//             Checkout
//           </h1>
//           <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
//             Please provide your valid delivery information to place your order.
//           </p>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 lg:grid-cols-3 gap-8"
//         >
//           {/* 📝 ১. বাম পাশ (২ কলাম): ডেলিভারি ইনফরমেশন ও পেমেন্ট */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* ডেলিভারি ডিটেইলস কার্ড */}
//             <div className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 p-5 md:p-6 rounded-2xl shadow-sm space-y-4">
//               <h2 className="text-sm font-black text-slate-950 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-zinc-800">
//                 <FaTruck className="text-[#C5A059]" /> Delivery Details
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* নাম */}
//                 <div className="space-y-1.5">
//                   <label className="text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
//                     <FaUser size={10} /> Full Name{" "}
//                     <span className="text-rose-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     required
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Enter your full name"
//                     className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-[#C5A059]"
//                   />
//                 </div>

//                 {/* ফোন */}
//                 <div className="space-y-1.5">
//                   <label className="text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
//                     <FaPhone size={10} /> Phone Number{" "}
//                     <span className="text-rose-500">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     required
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     placeholder="e.g. 017XXXXXXXX"
//                     className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-[#C5A059]"
//                   />
//                 </div>

//                 {/* ইমেইল */}
//                 <div className="space-y-1.5 md:col-span-2">
//                   <label className="text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
//                     <FaEnvelope size={10} /> Email Address
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="e.g. name@example.com"
//                     className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-[#C5A059]"
//                   />
//                 </div>

//                 {/* ডেলিভারি এলাকা (সিটি) */}
//                 <div className="space-y-1.5">
//                   <label className="text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
//                     <FaMapMarkerAlt size={10} /> City / Region{" "}
//                     <span className="text-rose-500">*</span>
//                   </label>
//                   <select
//                     name="city"
//                     value={formData.city}
//                     onChange={handleInputChange}
//                     className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-[#C5A059]"
//                   >
//                     <option value="Dhaka">Inside Dhaka (60 BDT)</option>
//                     <option value="Outside Dhaka">
//                       Outside Dhaka (120 BDT)
//                     </option>
//                   </select>
//                 </div>

//                 {/* বিস্তারিত ঠিকানা */}
//                 <div className="space-y-1.5 md:col-span-2">
//                   <label className="text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
//                     <FaMapMarkerAlt size={10} /> Detailed Address{" "}
//                     <span className="text-rose-500">*</span>
//                   </label>
//                   <textarea
//                     name="address"
//                     required
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     rows="2"
//                     placeholder="House no, Road no, Area details..."
//                     className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-[#C5A059] resize-none"
//                   ></textarea>
//                 </div>
//               </div>
//             </div>

//             {/* পেমেন্ট মেথড কার্ড */}
//             <div className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 p-5 md:p-6 rounded-2xl shadow-sm space-y-4">
//               <h2 className="text-sm font-black text-slate-950 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-zinc-800">
//                 <FaMoneyBillWave className="text-[#C5A059]" /> Choose Payment
//                 Method
//               </h2>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 {/* ক্যাশ অন ডেলিভারি */}
//                 <div
//                   onClick={() => setPaymentMethod("cod")}
//                   className={`border-2 rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer transition-all
//                     ${
//                       paymentMethod === "cod"
//                         ? "border-[#C5A059] bg-[#C5A059]/5"
//                         : "border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700"
//                     }`}
//                 >
//                   <div className="text-slate-700 dark:text-zinc-300">
//                     <FaMoneyBillWave
//                       size={22}
//                       className={
//                         paymentMethod === "cod" ? "text-[#C5A059]" : ""
//                       }
//                     />
//                   </div>
//                   <div>
//                     <h3 className="text-xs font-black text-slate-950 dark:text-white">
//                       Cash On Delivery
//                     </h3>
//                     <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5">
//                       Pay after receiving order
//                     </p>
//                   </div>
//                 </div>

//                 {/* মোবাইল ব্যাংকিং পেমেন্ট */}
//                 <div
//                   onClick={() => setPaymentMethod("mobile_pay")}
//                   className={`border-2 rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer transition-all
//                     ${
//                       paymentMethod === "mobile_pay"
//                         ? "border-[#C5A059] bg-[#C5A059]/5"
//                         : "border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700"
//                     }`}
//                 >
//                   <div className="text-slate-700 dark:text-zinc-300">
//                     <FaMobileAlt
//                       size={22}
//                       className={
//                         paymentMethod === "mobile_pay" ? "text-[#C5A059]" : ""
//                       }
//                     />
//                   </div>
//                   <div>
//                     <h3 className="text-xs font-black text-slate-950 dark:text-white">
//                       bKash / Nagad / Rocket
//                     </h3>
//                     <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5">
//                       Online secure mobile banking
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* 💵 ২. ডান পাশ (১ কলাম): অর্ডার সামারি প্যানেল */}
//           <div className="space-y-4">
//             <div className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 p-5 rounded-2xl shadow-sm space-y-4">
//               <h3 className="text-sm font-black text-slate-950 dark:text-white pb-3 border-b border-slate-100 dark:border-zinc-800">
//                 Product Summary
//               </h3>

//               {/* শর্ট কার্ট আইটেম প্রিভিউ */}
//               <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
//                 {cart.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center justify-between gap-3 text-xs"
//                   >
//                     <div className="flex items-center gap-2.5">
//                       <div className="w-10 h-10 bg-slate-100 dark:bg-zinc-800 rounded-lg overflow-hidden border border-slate-200/35 shrink-0">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <div>
//                         <h4 className="font-bold text-slate-900 dark:text-zinc-200 line-clamp-1">
//                           {item.name}
//                         </h4>
//                         <p className="text-[10px] text-slate-400 font-medium">
//                           Qty: {item.quantity} | Size: {item.size}
//                         </p>
//                       </div>
//                     </div>
//                     <span className="font-bold text-slate-900 dark:text-zinc-100 shrink-0">
//                       {item.price * item.quantity} BDT
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               {/* সামারি ম্যাথ ক্যালকুলেশন */}
//               <div className="space-y-2.5 text-xs pt-3 border-t border-slate-100 dark:border-zinc-800">
//                 <div className="flex justify-between text-slate-500 dark:text-zinc-400">
//                   <span>Subtotal</span>
//                   <span className="font-semibold text-slate-800 dark:text-zinc-200">
//                     {subtotal} BDT
//                   </span>
//                 </div>

//                 <div className="flex justify-between text-slate-500 dark:text-zinc-400">
//                   <span>Delivery Charge</span>
//                   <span className="font-semibold text-slate-800 dark:text-zinc-200">
//                     {shippingFee} BDT
//                   </span>
//                 </div>
//               </div>

//               <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-baseline">
//                 <span className="text-xs font-black text-slate-950 dark:text-white">
//                   Grand Total
//                 </span>
//                 <span className="text-lg font-black text-[#C5A059]">
//                   {total} BDT
//                 </span>
//               </div>

//               {/* সাবমিট বাটন */}
//               <button
//                 type="submit"
//                 className="w-full flex items-center justify-center gap-2 py-3 bg-[#C5A059] hover:bg-[#b08e4f] text-zinc-950 text-xs font-black rounded-xl transition-all shadow-md shadow-[#C5A059]/10"
//               >
//                 <FaShoppingBag size={11} /> Place Order ({total} BDT)
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

/// 2

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaArrowLeft,
//   FaShoppingBag,
//   FaUser,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaCheckCircle,
//   FaTruck,
//   FaMoneyBillWave,
//   FaMobileAlt,
//   FaCopy,
//   FaClipboardCheck,
//   FaSpinner,
// } from "react-icons/fa";
// import { useProducts } from "../../context/ProductContext";

// const Checkout = () => {
//   // Context থেকে ফাংশন ও স্টেট রিসিভ করা
//   const { cart, placeOrder, clearCart } = useProducts();

//   // ইনপুট স্টেট ম্যানেজমেন্ট
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     address: "",
//     city: "Dhaka",
//   });
//   // ফ্রন্টএন্ডের স্টেট সেকশনে এই দুটি লাইন এভাবে পরিবর্তন করুন:
//   const [paymentMethod, setPaymentMethod] = useState("COD"); // 🟢 'cod' থেকে 'COD' করা হলো
//   const [discount, setDiscount] = useState(0); // 🟢 'cod' থেকে 0 (Number) করা হলো

//   const [copied, setCopied] = useState(false);
//   const [orderSuccess, setOrderSuccess] = useState(false);
//   const [orderId, setOrderId] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // ডেলিভারি ও হিসাব-নিকাশ
//   const subtotal = cart.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0,
//   );
//   const shippingFee = formData.city === "Dhaka" ? 60 : 120;
//   const total = subtotal + shippingFee;

//   // ইনপুট হ্যান্ডলার
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ২. মূল হ্যান্ডেল সাবমিট ফাংশন
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.phone || !formData.address) {
//       alert("অনুগ্রহ করে নাম, ফোন নাম্বার এবং ঠিকানা সঠিকভাবে পূরণ করুন।");
//       return;
//     }

//     if (cart.length === 0) {
//       alert("আপনার কার্ট খালি! কোনো পণ্য যোগ করে আবার চেষ্টা করুন।");
//       return;
//     }

//     setIsSubmitting(true);

//     // 🟢 ব্যাকএন্ডের মডেল ও কন্ট্রোলারের সাথে হুবহু মিলিয়ে পে-লোড
//     const orderPayload = {
//       products: cart.map((item) => ({
//         productId: item._id || item.productId,
//         quantity: item.quantity,
//       })),
//       shippingAddress: {
//         fullName: formData.name,
//         phone: formData.phone,
//         fullAddress: formData.address,
//         city: formData.city || "",
//       },
//       paymentMethod: paymentMethod, // "COD" অথবা "ONLINE" / "BKASH"
//       shippingCost: Number(shippingFee) || 0,
//       discount: Number(discount) || 0,
//     };

//     try {
//       // 💳 যদি ইউজার অনলাইন পেমেন্ট সিলেক্ট করে
//       if (paymentMethod !== "COD") {
//         await initOnlinePayment(orderPayload);
//       }
//       // 💵 যদি ইউজার Cash on Delivery (COD) সিলেক্ট করে
//       else if (placeOrder) {
//         const res = await placeOrder(orderPayload);
//         if (res && res.success) {
//           setOrderId(res.data.orderId || res.data.order?._id || res.data._id);
//           setOrderSuccess(true);
//         } else {
//           alert(res?.message || "Order creation failed!");
//         }
//       }
//     } catch (error) {
//       console.error("Submit Error:", error);
//       alert("অর্ডার সম্পূর্ণ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // আইডি কপি করার ফাংশন
//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(orderId);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   /* ==========================================================
//      🎉 কার্ট খালি থাকলে রিটার্ন ভিউ
//      ========================================================== */
//   if (cart.length === 0 && !orderSuccess) {
//     return (
//       <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pt-28 pb-16 px-4 flex flex-col items-center justify-center text-center space-y-4">
//         <div className="w-16 h-16 bg-slate-200 dark:bg-zinc-800 rounded-full flex items-center justify-center text-slate-500">
//           <FaShoppingBag size={28} />
//         </div>
//         <h2 className="text-xl font-bold text-slate-900 dark:text-white">
//           Your Cart is Empty
//         </h2>
//         <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm">
//           You have no items in your shopping cart to checkout. Please add some
//           products first!
//         </p>
//         <Link
//           to="/"
//           className="px-6 py-2.5 bg-[#C5A059] text-zinc-950 font-bold text-xs rounded-xl shadow-md hover:bg-[#b08e4f] transition-all"
//         >
//           Return to Shop
//         </Link>
//       </div>
//     );
//   }

//   /* ==========================================================
//      🎉 অর্ডার সাকসেস ভিউ
//      ========================================================== */
//   if (orderSuccess) {
//     return (
//       <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pt-28 pb-16 px-4 md:px-8 flex items-center justify-center">
//         <div className="max-w-xl w-full bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 p-6 md:p-8 rounded-3xl shadow-lg text-center space-y-6">
//           <div className="flex justify-center">
//             <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-full flex items-center justify-center border-4 border-emerald-100 dark:border-emerald-900/30">
//               <FaCheckCircle size={32} className="animate-bounce" />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <h1 className="text-xl md:text-2xl font-black text-slate-950 dark:text-white">
//               Order Confirmed!
//             </h1>
//             <p className="text-xs text-slate-500 dark:text-zinc-400">
//               Thank you,{" "}
//               <span className="font-bold text-slate-800 dark:text-zinc-200">
//                 {formData.name}
//               </span>
//               ! Your order has been placed successfully and is being processed.
//             </p>
//           </div>

//           {/* 🎫 অর্ডার মেমো */}
//           <div className="bg-slate-50 dark:bg-zinc-950 border border-slate-200/50 dark:border-zinc-800 rounded-2xl p-4 text-left space-y-3.5">
//             <div className="flex items-center justify-between pb-3 border-b border-slate-200/40 dark:border-zinc-800 text-xs">
//               <span className="text-slate-400">Order ID:</span>
//               <div className="flex items-center gap-1.5">
//                 <span className="font-bold text-slate-800 dark:text-zinc-100">
//                   {orderId}
//                 </span>
//                 <button
//                   onClick={copyToClipboard}
//                   className="text-slate-400 hover:text-[#C5A059] transition-colors p-1"
//                   title="Copy ID"
//                 >
//                   {copied ? (
//                     <FaClipboardCheck className="text-emerald-500" />
//                   ) : (
//                     <FaCopy />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <div className="space-y-2 text-xs">
//               <p className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
//                 <FaUser size={10} className="text-[#C5A059]" />{" "}
//                 <strong>Name:</strong> {formData.name}
//               </p>
//               <p className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
//                 <FaPhone size={10} className="text-[#C5A059]" />{" "}
//                 <strong>Phone:</strong> {formData.phone}
//               </p>
//               <p className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
//                 <FaMapMarkerAlt size={10} className="text-[#C5A059]" />{" "}
//                 <strong>Address:</strong> {formData.address}, {formData.city}
//               </p>
//               <p className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
//                 <FaTruck size={10} className="text-[#C5A059]" />{" "}
//                 <strong>Delivery Mode:</strong>{" "}
//                 {formData.city === "Dhaka" ? "Inside Dhaka" : "Outside Dhaka"}{" "}
//                 (2-4 Days)
//               </p>
//               <p className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
//                 <FaMoneyBillWave size={10} className="text-[#C5A059]" />{" "}
//                 <strong>Payment Method:</strong>{" "}
//                 {paymentMethod === "cod"
//                   ? "Cash On Delivery"
//                   : "Mobile Banking (bKash/Nagad)"}
//               </p>
//             </div>

//             <div className="pt-3 border-t border-slate-200/40 dark:border-zinc-800 flex justify-between items-baseline">
//               <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">
//                 Total Paid/COD:
//               </span>
//               <span className="text-base font-black text-[#C5A059]">
//                 {total} BDT
//               </span>
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-3">
//             <Link
//               to="/"
//               className="flex-1 py-3 bg-zinc-950 dark:bg-zinc-100 hover:bg-zinc-900 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs font-bold rounded-xl transition-all shadow-md text-center"
//             >
//               Continue Shopping
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /* ==========================================================
//      ✍️ প্রধান চেকআউট ফর্ম ভিউ
//      ========================================================== */
//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pt-28 pb-16 px-4 md:px-8">
//       <div className="max-w-6xl mx-auto">
//         {/* 🏷️ পেজ হেডার */}
//         <div className="mb-8 border-b border-slate-200/40 dark:border-zinc-800 pb-5 flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-black text-slate-950 dark:text-white">
//               Checkout
//             </h1>
//             <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
//               Please provide your valid delivery information to place your
//               order.
//             </p>
//           </div>
//           <Link
//             to="/cart"
//             className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-zinc-400 hover:text-[#C5A059] transition-colors"
//           >
//             <FaArrowLeft /> Back to Cart
//           </Link>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 lg:grid-cols-3 gap-8"
//         >
//           {/* 📝 ১. ডেলিভারি ও পেমেন্ট ডিটেইলস */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 p-5 md:p-6 rounded-2xl shadow-sm space-y-4">
//               <h2 className="text-sm font-black text-slate-950 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-zinc-800">
//                 <FaTruck className="text-[#C5A059]" /> Delivery Details
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Full Name */}
//                 <div className="space-y-1.5">
//                   <label className="text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
//                     <FaUser size={10} /> Full Name{" "}
//                     <span className="text-rose-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     required
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Enter your full name"
//                     className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-[#C5A059]"
//                   />
//                 </div>

//                 {/* Phone Number */}
//                 <div className="space-y-1.5">
//                   <label className="text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
//                     <FaPhone size={10} /> Phone Number{" "}
//                     <span className="text-rose-500">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     required
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     placeholder="e.g. 017XXXXXXXX"
//                     className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-[#C5A059]"
//                   />
//                 </div>

//                 {/* Email Address */}
//                 <div className="space-y-1.5 md:col-span-2">
//                   <label className="text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
//                     <FaEnvelope size={10} /> Email Address (Optional)
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="e.g. name@example.com"
//                     className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-[#C5A059]"
//                   />
//                 </div>

//                 {/* City Selection */}
//                 <div className="space-y-1.5">
//                   <label className="text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
//                     <FaMapMarkerAlt size={10} /> City / Region{" "}
//                     <span className="text-rose-500">*</span>
//                   </label>
//                   <select
//                     name="city"
//                     value={formData.city}
//                     onChange={handleInputChange}
//                     className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-[#C5A059]"
//                   >
//                     <option value="Dhaka">Inside Dhaka (60 BDT)</option>
//                     <option value="Outside Dhaka">
//                       Outside Dhaka (120 BDT)
//                     </option>
//                   </select>
//                 </div>

//                 {/* Detailed Address */}
//                 <div className="space-y-1.5 md:col-span-2">
//                   <label className="text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
//                     <FaMapMarkerAlt size={10} /> Detailed Address{" "}
//                     <span className="text-rose-500">*</span>
//                   </label>
//                   <textarea
//                     name="address"
//                     required
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     rows="2"
//                     placeholder="House no, Road no, Area details..."
//                     className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-[#C5A059] resize-none"
//                   ></textarea>
//                 </div>
//               </div>
//             </div>

//             {/* Payment Selection */}
//             <div className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 p-5 md:p-6 rounded-2xl shadow-sm space-y-4">
//               <h2 className="text-sm font-black text-slate-950 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-zinc-800">
//                 <FaMoneyBillWave className="text-[#C5A059]" /> Choose Payment
//                 Method
//               </h2>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 {/* Cash on Delivery */}
//                 <div
//                   onClick={() => setPaymentMethod("cod")}
//                   className={`border-2 rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer transition-all
//                     ${
//                       paymentMethod === "cod"
//                         ? "border-[#C5A059] bg-[#C5A059]/5"
//                         : "border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700"
//                     }`}
//                 >
//                   <div className="text-slate-700 dark:text-zinc-300">
//                     <FaMoneyBillWave
//                       size={22}
//                       className={
//                         paymentMethod === "cod" ? "text-[#C5A059]" : ""
//                       }
//                     />
//                   </div>
//                   <div>
//                     <h3 className="text-xs font-black text-slate-950 dark:text-white">
//                       Cash On Delivery
//                     </h3>
//                     <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5">
//                       Pay after receiving order
//                     </p>
//                   </div>
//                 </div>

//                 {/* Mobile Payment */}
//                 <div
//                   onClick={() => setPaymentMethod("mobile_pay")}
//                   className={`border-2 rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer transition-all
//                     ${
//                       paymentMethod === "mobile_pay"
//                         ? "border-[#C5A059] bg-[#C5A059]/5"
//                         : "border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700"
//                     }`}
//                 >
//                   <div className="text-slate-700 dark:text-zinc-300">
//                     <FaMobileAlt
//                       size={22}
//                       className={
//                         paymentMethod === "mobile_pay" ? "text-[#C5A059]" : ""
//                       }
//                     />
//                   </div>
//                   <div>
//                     <h3 className="text-xs font-black text-slate-950 dark:text-white">
//                       bKash / Nagad / Rocket
//                     </h3>
//                     <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5">
//                       Online secure mobile banking
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* 💵 ২. অর্ডার সামারি */}
//           <div className="space-y-4">
//             <div className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 p-5 rounded-2xl shadow-sm space-y-4">
//               <h3 className="text-sm font-black text-slate-950 dark:text-white pb-3 border-b border-slate-100 dark:border-zinc-800">
//                 Product Summary
//               </h3>

//               <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
//                 {cart.map((item, index) => (
//                   <div
//                     key={item.id || index}
//                     className="flex items-center justify-between gap-3 text-xs"
//                   >
//                     <div className="flex items-center gap-2.5">
//                       <div className="w-10 h-10 bg-slate-100 dark:bg-zinc-800 rounded-lg overflow-hidden border border-slate-200/35 shrink-0">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <div>
//                         <h4 className="font-bold text-slate-900 dark:text-zinc-200 line-clamp-1">
//                           {item.name}
//                         </h4>
//                         <p className="text-[10px] text-slate-400 font-medium">
//                           Qty: {item.quantity}{" "}
//                           {item.size ? `| Size: ${item.size}` : ""}
//                         </p>
//                       </div>
//                     </div>
//                     <span className="font-bold text-slate-900 dark:text-zinc-100 shrink-0">
//                       {item.price * item.quantity} BDT
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               <div className="space-y-2.5 text-xs pt-3 border-t border-slate-100 dark:border-zinc-800">
//                 <div className="flex justify-between text-slate-500 dark:text-zinc-400">
//                   <span>Subtotal</span>
//                   <span className="font-semibold text-slate-800 dark:text-zinc-200">
//                     {subtotal} BDT
//                   </span>
//                 </div>

//                 <div className="flex justify-between text-slate-500 dark:text-zinc-400">
//                   <span>Delivery Charge</span>
//                   <span className="font-semibold text-slate-800 dark:text-zinc-200">
//                     {shippingFee} BDT
//                   </span>
//                 </div>
//               </div>

//               <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-baseline">
//                 <span className="text-xs font-black text-slate-950 dark:text-white">
//                   Grand Total
//                 </span>
//                 <span className="text-lg font-black text-[#C5A059]">
//                   {total} BDT
//                 </span>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full flex items-center justify-center gap-2 py-3 bg-[#C5A059] hover:bg-[#b08e4f] disabled:opacity-50 text-zinc-950 text-xs font-black rounded-xl transition-all shadow-md shadow-[#C5A059]/10"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <FaSpinner className="animate-spin" size={12} />{" "}
//                     Processing...
//                   </>
//                 ) : (
//                   <>
//                     <FaShoppingBag size={11} /> Place Order ({total} BDT)
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

/// 3
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import {
//   FaArrowLeft,
//   FaShoppingBag,
//   FaUser,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaCheckCircle,
//   FaTruck,
//   FaMoneyBillWave,
//   FaCreditCard,
//   FaCopy,
//   FaClipboardCheck,
//   FaSpinner,
// } from "react-icons/fa";
// import { useProducts } from "../../context/ProductContext";

// const API_BASE_URL = "http://localhost:5000/api";

// const Checkout = () => {
//   // Context থেকে ফাংশন ও স্টেট রিসিভ করা
//   const { cart, placeOrder, clearCart } = useProducts();

//   // ইনপুট স্টেট ম্যানেজমেন্ট
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     address: "",
//     city: "Dhaka",
//   });

//   const [paymentMethod, setPaymentMethod] = useState("COD"); // 'COD' অথবা 'ONLINE'
//   const [discount, setDiscount] = useState(0);

//   const [copied, setCopied] = useState(false);
//   const [orderSuccess, setOrderSuccess] = useState(false);
//   const [orderId, setOrderId] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // ডেলিভারি ও হিসাব-নিকাশ
//   const subtotal = cart.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0,
//   );
//   const shippingFee = formData.city === "Dhaka" ? 60 : 120;
//   const total = Math.max(0, subtotal + shippingFee - discount);

//   // ইনপুট হ্যান্ডলার
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // 💳 SSLCommerz / Online Payment ইনিশিয়ালাইজেশন ফাংশন
//   const initOnlinePayment = async (orderId, paymentPayload) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/payment/initiate-payment`,
//         {
//           orderId,
//           ...paymentPayload,
//         },
//       );

//       if (response.data && response.data.url) {
//         // SSLCommerz এর পেমেন্ট গেটওয়ে পেজে রিডাইরেক্ট করবে
//         window.location.href = response.data.url;
//       } else {
//         alert("পেমেন্ট গেটওয়ে লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
//       }
//     } catch (error) {
//       console.error("SSL Gateway Error:", error);
//       alert(
//         error.response?.data?.message ||
//           "অনলাইন পেমেন্ট প্রসেস করতে সমস্যা হয়েছে।",
//       );
//     }
//   };

//   // 📝 মূল সাবমিট হ্যান্ডলার
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !formData.name.trim() ||
//       !formData.phone.trim() ||
//       !formData.address.trim()
//     ) {
//       alert("অনুগ্রহ করে নাম, ফোন নাম্বার এবং ঠিকানা সঠিকভাবে পূরণ করুন।");
//       return;
//     }

//     if (cart.length === 0) {
//       alert("আপনার কার্ট খালি! কোনো পণ্য যোগ করে আবার চেষ্টা করুন।");
//       return;
//     }

//     setIsSubmitting(true);

//     const orderPayload = {
//       products: cart?.map((item) => ({
//         productId: item._id || item.productId || item.id,
//         name: item.name,
//         price: item.price,
//         quantity: item.quantity,
//         size: item.size || null,
//         image: item.image || "",
//       })),
//       shippingAddress: {
//         fullName: formData.name,
//         phone: formData.phone,
//         email: formData.email,
//         fullAddress: formData.address,
//         city: formData.city || "Dhaka",
//       },
//       paymentMethod: paymentMethod, // "COD" বা "ONLINE"
//       totalAmount: total,
//       subtotal: subtotal,
//       shippingCost: Number(shippingFee) || 0,
//       discount: Number(discount) || 0,
//     };

//     try {
//       // ১. প্রথমে ডাটাবেজে অর্ডার সেভ করা (COD বা Online যেটাই হোক)
//       let res;
//       if (placeOrder) {
//         res = await placeOrder(orderPayload);
//       } else {
//         const response = await axios.post(
//           `${API_BASE_URL}/orders`,
//           orderPayload,
//         );
//         res = response.data;
//       }

//       if (!res || !res.success) {
//         alert(res?.message || "অর্ডার তৈরি করতে ব্যর্থ হয়েছে!");
//         setIsSubmitting(false);
//         return;
//       }

//       const createdOrderId =
//         res.data?.orderId || res.data?.order?._id || res.data?._id;

//       setOrderId(createdOrderId);

//       // 💳 ২. অনলাইন পেমেন্ট সিলেক্ট করলে গেটওয়েতে রিডাইরেক্ট করা
//       if (paymentMethod === "ONLINE") {
//         const paymentPayload = {
//           customerDetails: {
//             name: formData.name,
//             phone: formData.phone,
//             email: formData.email,
//             address: formData.address,
//             city: formData.city || "Dhaka",
//           },
//           totalAmount: total,
//         };

//         await initOnlinePayment(createdOrderId, paymentPayload);
//       }
//       // 💵 ৩. Cash on Delivery (COD) হলে সাকসেস পেজ দেখানো
//       else {
//         setOrderSuccess(true);
//         if (clearCart) clearCart();
//       }
//     } catch (error) {
//       console.error("Submit Error:", error);
//       alert("অর্ডার সম্পূর্ণ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // আইডি কপি করার ফাংশন
//   const copyToClipboard = () => {
//     if (orderId) {
//       navigator.clipboard.writeText(orderId);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   /* ==========================================================
//      🎉 কার্ট খালি থাকলে রিটার্ন ভিউ
//   ========================================================== */
//   if (cart.length === 0 && !orderSuccess) {
//     return (
//       <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pt-28 pb-16 px-4 flex flex-col items-center justify-center text-center space-y-4">
//         <div className="w-16 h-16 bg-slate-200 dark:bg-zinc-800 rounded-full flex items-center justify-center text-slate-500">
//           <FaShoppingBag size={28} />
//         </div>
//         <h2 className="text-xl font-bold text-slate-900 dark:text-white">
//           Your Cart is Empty
//         </h2>
//         <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm">
//           You have no items in your shopping cart to checkout. Please add some
//           products first!
//         </p>
//         <Link
//           to="/"
//           className="px-6 py-2.5 bg-[#C5A059] text-zinc-950 font-bold text-xs rounded-xl shadow-md hover:bg-[#b08e4f] transition-all"
//         >
//           Return to Shop
//         </Link>
//       </div>
//     );
//   }

//   /* ==========================================================
//      🎉 COD অর্ডার সাকসেস ভিউ
//   ========================================================== */
//   if (orderSuccess) {
//     return (
//       <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pt-28 pb-16 px-4 md:px-8 flex items-center justify-center">
//         <div className="max-w-xl w-full bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 p-6 md:p-8 rounded-3xl shadow-lg text-center space-y-6">
//           <div className="flex justify-center">
//             <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-full flex items-center justify-center border-4 border-emerald-100 dark:border-emerald-900/30">
//               <FaCheckCircle size={32} className="animate-bounce" />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <h1 className="text-xl md:text-2xl font-black text-slate-950 dark:text-white">
//               Order Confirmed!
//             </h1>
//             <p className="text-xs text-slate-500 dark:text-zinc-400">
//               Thank you,{" "}
//               <span className="font-bold text-slate-800 dark:text-zinc-200">
//                 {formData.name}
//               </span>
//               ! Your order has been placed successfully and is being processed.
//             </p>
//           </div>

//           <div className="bg-slate-50 dark:bg-zinc-950 border border-slate-200/50 dark:border-zinc-800 rounded-2xl p-4 text-left space-y-3.5">
//             <div className="flex items-center justify-between pb-3 border-b border-slate-200/40 dark:border-zinc-800 text-xs">
//               <span className="text-slate-400">Order ID:</span>
//               <div className="flex items-center gap-1.5">
//                 <span className="font-bold text-slate-800 dark:text-zinc-100">
//                   {orderId}
//                 </span>
//                 <button
//                   onClick={copyToClipboard}
//                   className="text-slate-400 hover:text-[#C5A059] transition-colors p-1"
//                   title="Copy ID"
//                 >
//                   {copied ? (
//                     <FaClipboardCheck className="text-emerald-500" />
//                   ) : (
//                     <FaCopy />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <div className="space-y-2 text-xs">
//               <p className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
//                 <FaUser size={10} className="text-[#C5A059]" />{" "}
//                 <strong>Name:</strong> {formData.name}
//               </p>
//               <p className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
//                 <FaPhone size={10} className="text-[#C5A059]" />{" "}
//                 <strong>Phone:</strong> {formData.phone}
//               </p>
//               <p className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
//                 <FaMapMarkerAlt size={10} className="text-[#C5A059]" />{" "}
//                 <strong>Address:</strong> {formData.address}, {formData.city}
//               </p>
//               <p className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
//                 <FaTruck size={10} className="text-[#C5A059]" />{" "}
//                 <strong>Delivery Mode:</strong>{" "}
//                 {formData.city === "Dhaka" ? "Inside Dhaka" : "Outside Dhaka"}{" "}
//                 (2-4 Days)
//               </p>
//               <p className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
//                 <FaMoneyBillWave size={10} className="text-[#C5A059]" />{" "}
//                 <strong>Payment Method:</strong> Cash On Delivery
//               </p>
//             </div>

//             <div className="pt-3 border-t border-slate-200/40 dark:border-zinc-800 flex justify-between items-baseline">
//               <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">
//                 Total Payable:
//               </span>
//               <span className="text-base font-black text-[#C5A059]">
//                 {total} BDT
//               </span>
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-3">
//             <Link
//               to="/"
//               className="flex-1 py-3 bg-zinc-950 dark:bg-zinc-100 hover:bg-zinc-900 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs font-bold rounded-xl transition-all shadow-md text-center"
//             >
//               Continue Shopping
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /* ==========================================================
//      ✍️ প্রধান চেকআউট ফর্ম ভিউ
//   ========================================================== */
//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pt-28 pb-16 px-4 md:px-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="mb-8 border-b border-slate-200/40 dark:border-zinc-800 pb-5 flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-black text-slate-950 dark:text-white">
//               Checkout
//             </h1>
//             <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
//               Please provide your valid delivery information to place your
//               order.
//             </p>
//           </div>
//           <Link
//             to="/cart"
//             className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-zinc-400 hover:text-[#C5A059] transition-colors"
//           >
//             <FaArrowLeft /> Back to Cart
//           </Link>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 lg:grid-cols-3 gap-8"
//         >
//           {/* 📝 ১. ডেলিভারি ও পেমেন্ট ডিটেইলস */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 p-5 md:p-6 rounded-2xl shadow-sm space-y-4">
//               <h2 className="text-sm font-black text-slate-950 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-zinc-800">
//                 <FaTruck className="text-[#C5A059]" /> Delivery Details
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-1.5">
//                   <label className="text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
//                     <FaUser size={10} /> Full Name{" "}
//                     <span className="text-rose-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     required
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Enter your full name"
//                     className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-[#C5A059]"
//                   />
//                 </div>

//                 <div className="space-y-1.5">
//                   <label className="text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
//                     <FaPhone size={10} /> Phone Number{" "}
//                     <span className="text-rose-500">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     required
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     placeholder="e.g. 017XXXXXXXX"
//                     className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-[#C5A059]"
//                   />
//                 </div>

//                 <div className="space-y-1.5 md:col-span-2">
//                   <label className="text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
//                     <FaEnvelope size={10} /> Email Address (Optional)
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="e.g. name@example.com"
//                     className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-[#C5A059]"
//                   />
//                 </div>

//                 <div className="space-y-1.5">
//                   <label className="text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
//                     <FaMapMarkerAlt size={10} /> City / Region{" "}
//                     <span className="text-rose-500">*</span>
//                   </label>
//                   <select
//                     name="city"
//                     value={formData.city}
//                     onChange={handleInputChange}
//                     className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-[#C5A059]"
//                   >
//                     <option value="Dhaka">Inside Dhaka (60 BDT)</option>
//                     <option value="Outside Dhaka">
//                       Outside Dhaka (120 BDT)
//                     </option>
//                   </select>
//                 </div>

//                 <div className="space-y-1.5 md:col-span-2">
//                   <label className="text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
//                     <FaMapMarkerAlt size={10} /> Detailed Address{" "}
//                     <span className="text-rose-500">*</span>
//                   </label>
//                   <textarea
//                     name="address"
//                     required
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     rows="2"
//                     placeholder="House no, Road no, Area details..."
//                     className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-[#C5A059] resize-none"
//                   ></textarea>
//                 </div>
//               </div>
//             </div>

//             {/* Payment Selection */}
//             <div className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 p-5 md:p-6 rounded-2xl shadow-sm space-y-4">
//               <h2 className="text-sm font-black text-slate-950 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-zinc-800">
//                 <FaMoneyBillWave className="text-[#C5A059]" /> Choose Payment
//                 Method
//               </h2>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 {/* Cash on Delivery */}
//                 <div
//                   onClick={() => setPaymentMethod("COD")}
//                   className={`border-2 rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer transition-all ${
//                     paymentMethod === "COD"
//                       ? "border-[#C5A059] bg-[#C5A059]/5"
//                       : "border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700"
//                   }`}
//                 >
//                   <div className="text-slate-700 dark:text-zinc-300">
//                     <FaMoneyBillWave
//                       size={22}
//                       className={
//                         paymentMethod === "COD" ? "text-[#C5A059]" : ""
//                       }
//                     />
//                   </div>
//                   <div>
//                     <h3 className="text-xs font-black text-slate-950 dark:text-white">
//                       Cash On Delivery
//                     </h3>
//                     <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5">
//                       Pay after receiving order
//                     </p>
//                   </div>
//                 </div>

//                 {/* Online Payment (SSLCommerz) */}
//                 <div
//                   onClick={() => setPaymentMethod("ONLINE")}
//                   className={`border-2 rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer transition-all ${
//                     paymentMethod === "ONLINE"
//                       ? "border-[#C5A059] bg-[#C5A059]/5"
//                       : "border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700"
//                   }`}
//                 >
//                   <div className="text-slate-700 dark:text-zinc-300">
//                     <FaCreditCard
//                       size={22}
//                       className={
//                         paymentMethod === "ONLINE" ? "text-[#C5A059]" : ""
//                       }
//                     />
//                   </div>
//                   <div>
//                     <h3 className="text-xs font-black text-slate-950 dark:text-white">
//                       Online Payment (SSLCommerz)
//                     </h3>
//                     <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5">
//                       bKash, Nagad, Cards & Net Banking
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* 💵 ২. অর্ডার সামারি */}
//           <div className="space-y-4">
//             <div className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 p-5 rounded-2xl shadow-sm space-y-4">
//               <h3 className="text-sm font-black text-slate-950 dark:text-white pb-3 border-b border-slate-100 dark:border-zinc-800">
//                 Product Summary
//               </h3>

//               <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
//                 {cart.map((item, index) => (
//                   <div
//                     key={item.id || item._id || index}
//                     className="flex items-center justify-between gap-3 text-xs"
//                   >
//                     <div className="flex items-center gap-2.5">
//                       <div className="w-10 h-10 bg-slate-100 dark:bg-zinc-800 rounded-lg overflow-hidden border border-slate-200/35 shrink-0">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <div>
//                         <h4 className="font-bold text-slate-900 dark:text-zinc-200 line-clamp-1">
//                           {item.name}
//                         </h4>
//                         <p className="text-[10px] text-slate-400 font-medium">
//                           Qty: {item.quantity}{" "}
//                           {item.size ? `| Size: ${item.size}` : ""}
//                         </p>
//                       </div>
//                     </div>
//                     <span className="font-bold text-slate-900 dark:text-zinc-100 shrink-0">
//                       {item.price * item.quantity} BDT
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               <div className="space-y-2.5 text-xs pt-3 border-t border-slate-100 dark:border-zinc-800">
//                 <div className="flex justify-between text-slate-500 dark:text-zinc-400">
//                   <span>Subtotal</span>
//                   <span className="font-semibold text-slate-800 dark:text-zinc-200">
//                     {subtotal} BDT
//                   </span>
//                 </div>

//                 <div className="flex justify-between text-slate-500 dark:text-zinc-400">
//                   <span>Delivery Charge</span>
//                   <span className="font-semibold text-slate-800 dark:text-zinc-200">
//                     {shippingFee} BDT
//                   </span>
//                 </div>

//                 {discount > 0 && (
//                   <div className="flex justify-between text-emerald-500">
//                     <span>Discount</span>
//                     <span className="font-semibold">-{discount} BDT</span>
//                   </div>
//                 )}
//               </div>

//               <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-baseline">
//                 <span className="text-xs font-black text-slate-950 dark:text-white">
//                   Grand Total
//                 </span>
//                 <span className="text-lg font-black text-[#C5A059]">
//                   {total} BDT
//                 </span>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full flex items-center justify-center gap-2 py-3 bg-[#C5A059] hover:bg-[#b08e4f] disabled:opacity-50 text-zinc-950 text-xs font-black rounded-xl transition-all shadow-md shadow-[#C5A059]/10 cursor-pointer"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <FaSpinner className="animate-spin" size={12} />{" "}
//                     Processing...
//                   </>
//                 ) : (
//                   <>
//                     <FaShoppingBag size={11} /> Place Order ({total} BDT)
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

/// 4
import React, { useState } from "react";
import { useProducts } from "../../context/ProductContext";

const CheckoutPage = () => {
  const { cart } = useProducts();

  console.log(cart, "card ch");

  // 1. Dummy Cart / Order Items (পরবর্তীতে API বা Cart Context থেকে আসবে)
  const cartItems = [
    {
      id: 1,
      title: "Premium Wireless Headphones",
      price: 2500,
      quantity: 1,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      title: "Smart Fitness Watch",
      price: 1800,
      quantity: 2,
      image: "https://via.placeholder.com/80",
    },
  ];

  // 2. Shipping Calculation (Dummy Calculation)
  const deliveryCharge = 80;
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const grandTotal = subtotal + deliveryCharge;

  // 3. User & Shipping Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });

  // 4. Payment Method State ('cod' or 'sslcommerz')
  const [paymentMethod, setPaymentMethod] = useState("sslcommerz");
  const [selectedOnlineMethod, setSelectedOnlineMethod] = useState("bkash"); // bkash, nagad, rocket, card

  // Form Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit / Order Handle Function
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const orderData = {
      customer: formData,
      items: cartItems,
      subtotal,
      deliveryCharge,
      grandTotal,
      paymentMethod,
      onlineMethodDetails:
        paymentMethod === "sslcommerz" ? selectedOnlineMethod : null,
    };

    console.log("Order Submitted Data:", orderData);

    if (paymentMethod === "cod") {
      alert("অর্ডার সফলভাবে প্লেস হয়েছে (Cash on Delivery)!");
      // TODO: আপনার Backend Endpoint-এ POST Request পাঠান
    } else {
      alert("SSLCommerz Gateway-তে রিডাইরেক্ট করা হচ্ছে...");
      // TODO: Backend থেকে SSLCommerz init API কল করে `GatewayPageURL`-এ রিডাইরেক্ট করুন
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
          চেকআউট (Checkout)
        </h1>

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* LEFT SIDE: Shipping Info & Payment Methods */}
          <div className="lg:col-span-7 space-y-6">
            {/* Shipping Information Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span>📍</span> শিপিং ও কাস্টমার তথ্য
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    পূর্ণ নাম *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="যেমন: মোঃ নাম"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    মোবাইল নম্বর *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="017XXXXXXXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ইমেইল (ঐচ্ছিক)
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    পূর্ণাঙ্গ ঠিকানা *
                  </label>
                  <textarea
                    name="address"
                    required
                    rows="2"
                    placeholder="বাসা/হোল্ডিং নম্বর, রোড, এলাকা, থানা..."
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    জেলা / শহর *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="যেমন: ঢাকা / গাইবান্ধা"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    পোস্টাল কোড
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="5700"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span>💳</span> পেমেন্ট মেথড সিলেক্ট করুন
              </h2>

              <div className="space-y-4">
                {/* Option 1: Cash on Delivery */}
                <label
                  className={`flex items-start p-4 border rounded-xl cursor-pointer transition ${
                    paymentMethod === "cod"
                      ? "border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="ml-3">
                    <span className="block text-base font-medium text-gray-800">
                      ক্যাশ অন ডেলিভারি (Cash on Delivery)
                    </span>
                    <span className="block text-sm text-gray-500 mt-0.5">
                      পণ্য হাতে পেয়ে টাকা পরিশোধ করুন।
                    </span>
                  </div>
                </label>

                {/* Option 2: SSLCommerz (Online Payment) */}
                <label
                  className={`flex items-start p-4 border rounded-xl cursor-pointer transition ${
                    paymentMethod === "sslcommerz"
                      ? "border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="sslcommerz"
                    checked={paymentMethod === "sslcommerz"}
                    onChange={() => setPaymentMethod("sslcommerz")}
                    className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="ml-3 w-full">
                    <div className="flex justify-between items-center">
                      <span className="block text-base font-medium text-gray-800">
                        অনলাইন পেমেন্ট (SSLCommerz Gateway)
                      </span>
                      <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full">
                        Instant & Secure
                      </span>
                    </div>
                    <span className="block text-sm text-gray-500 mt-0.5">
                      bKash, Nagad, Rocket, Upay, Visa, Mastercard বা যেকোনো
                      কার্ড থেকে নিরাপদে পেমেন্ট করুন।
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Order Summary & Checkout Action */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-3">
                অর্ডার সামারি (Order Summary)
              </h2>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mb-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-sm py-1"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.images[0].url}
                        alt={item.title}
                        className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                      />
                      <div>
                        <p className="font-medium text-gray-800 line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          পরিমাণ: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-700">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Calculation Breakdown */}
              <div className="space-y-2 border-t pt-4 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>সাবটোটাল (Subtotal):</span>
                  <span className="font-medium text-gray-800">
                    ৳{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>ডেলিভারি চার্জ:</span>
                  <span className="font-medium text-gray-800">
                    ৳{deliveryCharge}
                  </span>
                </div>
                <div className="border-t border-dashed pt-3 flex justify-between text-base font-bold text-gray-900">
                  <span>সর্বমোট (Grand Total):</span>
                  <span className="text-emerald-600 text-lg">
                    ৳{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2"
              >
                <span>
                  {paymentMethod === "cod"
                    ? "অর্ডার নিশ্চিত করুন (COD)"
                    : "পেমেন্ট করুন (SSLCommerz)"}
                </span>
                <span>➔</span>
              </button>

              <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
                🔒 ১০০% নিরাপদ ও এনক্রিপ্টেড পেমেন্ট প্রসেসিং
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
