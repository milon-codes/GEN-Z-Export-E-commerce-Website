// import React, { useState } from "react";
// import {
//   CreditCard,
//   Smartphone,
//   ShieldCheck,
//   Lock,
//   Sun,
//   Moon,
//   Check,
//   ArrowRight,
//   Sparkles,
//   HelpCircle,
// } from "lucide-react";

// const SSLPaymentCheckout = () => {
//   const [isDark, setIsDark] = useState(true);
//   const [tab, setTab] = useState("mobile"); // 'mobile', 'card', 'bank', 'emi'
//   const [selectedMFS, setSelectedMFS] = useState("bkash");
//   const [selectedCardType, setSelectedCardType] = useState("visa");
//   const [isLoading, setIsLoading] = useState(false);

//   // MFS Gateways with Official Colors & Logos
//   const mfsList = [
//     {
//       id: "bkash",
//       name: "bKash",
//       code: "বিকাশ",
//       src: "bKash.svg",
//       alt: "bKash",
//       bg: "bg-pink-500/10 dark:bg-pink-500/20",
//       border: "border-pink-500",
//       text: "text-pink-600 dark:text-pink-400",
//     },
//     {
//       id: "nagad",
//       name: "Nagad",
//       code: "নগদ",
//       src: "nagad.png",
//       alt: "nagad",
//       bg: "bg-orange-500/10 dark:bg-orange-500/20",
//       border: "border-orange-500",
//       text: "text-orange-600 dark:text-orange-400",
//     },
//     {
//       id: "rocket",
//       name: "Rocket",
//       code: "রকেট",
//       src: "rocket.png",
//       alt: "bKash",
//       bg: "bg-purple-500/10 dark:bg-purple-500/20",
//       border: "border-purple-500",
//       text: "text-purple-600 dark:text-purple-400",
//     },
//     {
//       id: "cellfin",
//       name: "Cellfin",
//       code: "সেলফিন",
//       src: "cellfin.png",
//       alt: "bKash",
//       bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
//       border: "border-emerald-500",
//       text: "text-emerald-600 dark:text-emerald-400",
//     },
//   ];

//   // Bank Cards
//   const cardsList = [
//     { id: "visa", name: "VISA", logo: "💳 Visa" },
//     { id: "master", name: "Mastercard", logo: "🔴🟠 Master" },
//     { id: "amex", name: "AMEX", logo: "💙 Amex" },
//     { id: "nexus", name: "DBBL Nexus", logo: "🏦 Nexus" },
//   ];

//   const handlePayment = (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       alert("Redirecting to SSLCommerz Gateway Server...");
//     }, 1200);
//   };

//   return (
//     <div className={isDark ? "dark" : ""}>
//       <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex items-center justify-center p-3 sm:p-6 transition-colors duration-300 font-sans">
//         {/* Main Glassmorphism Card */}
//         <div className="w-full max-w-4xl bg-white dark:bg-slate-900/90 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800/80 overflow-hidden flex flex-col md:flex-row backdrop-blur-xl">
//           {/* LEFT: Checkout Summary */}
//           <div className="w-full md:w-5/12 bg-slate-50 dark:bg-slate-900/50 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
//             <div>
//               {/* Brand Header */}
//               <div className="flex items-center justify-between mb-8">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-600/30">
//                     S
//                   </div>
//                   <div>
//                     <h1 className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
//                       SSLCOMMERZ
//                       <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
//                     </h1>
//                     <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">
//                       Secured Gateway
//                     </p>
//                   </div>
//                 </div>

//                 {/* Dark/Light Switcher */}
//                 <button
//                   onClick={() => setIsDark(!isDark)}
//                   className="p-2.5 rounded-2xl bg-slate-200/60 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all"
//                   title="Toggle Mode"
//                 >
//                   {isDark ? (
//                     <Sun className="w-4 h-4 text-amber-400" />
//                   ) : (
//                     <Moon className="w-4 h-4 text-indigo-600" />
//                   )}
//                 </button>
//               </div>

//               {/* Price Tag */}
//               <div className="mb-6 p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
//                 <span className="text-xs font-semibold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
//                   মোট প্রদেয় মূল্য
//                 </span>
//                 <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
//                   ৳ ১,৫০০
//                   <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
//                     .০০
//                   </span>
//                 </div>
//               </div>

//               {/* Order Item Details */}
//               <div className="space-y-3 text-xs">
//                 <div className="flex justify-between text-slate-600 dark:text-slate-400">
//                   <span>ইনভয়েস নম্বর:</span>
//                   <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
//                     #INV-2026-992
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-slate-600 dark:text-slate-400">
//                   <span>সার্ভিস/প্রোডাক্ট:</span>
//                   <span className="font-medium text-slate-800 dark:text-slate-200">
//                     Pro Subscription Plan
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-slate-600 dark:text-slate-400">
//                   <span>ভ্যাট ও সার্ভিস চার্জ:</span>
//                   <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
//                     ৳ ০.০০ (ফ্রি)
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Security Badge Footer */}
//             <div className="mt-8 pt-5 border-t border-slate-200 dark:border-slate-800/80">
//               <div className="flex items-center gap-2.5 text-[11px] text-slate-500 dark:text-slate-400">
//                 <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
//                 <span>
//                   বাংলাদেশ ব্যাংক অনুমোদিত ২৫৬-বিট এসএসএল সুরক্ষিত পেমেন্ট
//                   গেটওয়ে।
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT: Payment Selector & Form */}
//           <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between">
//             <div>
//               <div className="flex items-center justify-between mb-5">
//                 <h2 className="text-lg font-bold text-slate-900 dark:text-white">
//                   পেমেন্ট মেথড বেছে নিন
//                 </h2>
//                 <HelpCircle className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
//               </div>

//               {/* Tab Navigation */}
//               <div className="grid grid-cols-4 gap-2 mb-6 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-2xl">
//                 {[
//                   { id: "mobile", label: "মোবাইল", icon: Smartphone },
//                   { id: "card", label: "কার্ড", icon: CreditCard },
//                 ].map((item) => {
//                   const Icon = item.icon;
//                   const active = tab === item.id;
//                   return (
//                     <button
//                       key={item.id}
//                       type="button"
//                       onClick={() => setTab(item.id)}
//                       className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all ${
//                         active
//                           ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md"
//                           : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
//                       }`}
//                     >
//                       <Icon className="w-4 h-4" />
//                       <span>{item.label}</span>
//                     </button>
//                   );
//                 })}
//               </div>

//               {/* Form Content */}
//               <form onSubmit={handlePayment}>
//                 {/* 1. MOBILE BANKING (MFS) */}
//                 {tab === "mobile" && (
//                   <div className="space-y-4">
//                     <div className="grid grid-cols-2 gap-3">
//                       {mfsList.map((mfs) => {
//                         const active = selectedMFS === mfs.id;
//                         return (
//                           <div
//                             key={mfs.id}
//                             onClick={() => setSelectedMFS(mfs.id)}
//                             className={`relative cursor-pointer p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between ${
//                               active
//                                 ? `${mfs.border} ${mfs.bg}`
//                                 : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
//                             }`}
//                           >
//                             <div className="flex items-center gap-2.5">
//                               <div
//                                 className={`w-8 h-8 rounded-xl ${mfs.badge} text-white flex items-center justify-center font-bold text-xs`}
//                               >
//                                 <img src={mfs.src} alt={mfs.alt} />
//                               </div>
//                               <div>
//                                 <p className={`font-bold text-sm ${mfs.text}`}>
//                                   {mfs.name}
//                                 </p>
//                                 <p className="text-[10px] text-slate-400">
//                                   {mfs.code}
//                                 </p>
//                               </div>
//                             </div>
//                             {active && (
//                               <Check className={`w-4 h-4 ${mfs.text}`} />
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>

//                     <div className="pt-2">
//                       <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
//                         {selectedMFS.toUpperCase()} মোবাইল নম্বর
//                       </label>
//                       <input
//                         type="tel"
//                         required
//                         maxLength="11"
//                         placeholder="017XXXXXXXX"
//                         className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {/* 2. CARD PAYMENT */}
//                 {tab === "card" && (
//                   <div className="space-y-3.5">
//                     <div className="flex gap-2 mb-1">
//                       {cardsList.map((c) => (
//                         <button
//                           key={c.id}
//                           type="button"
//                           onClick={() => setSelectedCardType(c.id)}
//                           className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
//                             selectedCardType === c.id
//                               ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
//                               : "border-slate-200 dark:border-slate-800 text-slate-500"
//                           }`}
//                         >
//                           {c.logo}
//                         </button>
//                       ))}
//                     </div>

//                     <div>
//                       <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
//                         কার্ড হোল্ডারের নাম
//                       </label>
//                       <input
//                         type="text"
//                         required
//                         placeholder="MD. TANVIR HOSSAIN"
//                         className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
//                         কার্ড নম্বর
//                       </label>
//                       <input
//                         type="text"
//                         required
//                         maxLength="19"
//                         placeholder="4532  0000  0000  0000"
//                         className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
//                       />
//                     </div>

//                     <div className="grid grid-cols-2 gap-3">
//                       <div>
//                         <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
//                           মেয়াদ (MM/YY)
//                         </label>
//                         <input
//                           type="text"
//                           required
//                           maxLength="5"
//                           placeholder="12/28"
//                           className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-center"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
//                           CVV/CVC
//                         </label>
//                         <input
//                           type="password"
//                           required
//                           maxLength="4"
//                           placeholder="•••"
//                           className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-center"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* SUBMIT BUTTON */}
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-2xl transition-all shadow-lg shadow-indigo-600/30 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
//                 >
//                   {isLoading ? (
//                     <span>অপেক্ষা করুন...</span>
//                   ) : (
//                     <>
//                       <Lock className="w-4 h-4" />
//                       <span>৳ ১,৫০০ নিশ্চিত করুন</span>
//                       <ArrowRight className="w-4 h-4" />
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>

//             <div className="mt-4 text-center">
//               <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
//                 SSLCommerz Engine v4.0
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SSLPaymentCheckout;

/// 2

import React, { useState } from "react";
import {
  CreditCard,
  Smartphone,
  ShieldCheck,
  Lock,
  Sun,
  Moon,
  Check,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Truck,
} from "lucide-react";

const SSLPaymentCheckout = () => {
  const [isDark, setIsDark] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("online"); // 'online' or 'cod'
  const [tab, setTab] = useState("mobile"); // 'mobile', 'card'
  const [selectedMFS, setSelectedMFS] = useState("bkash");
  const [selectedCardType, setSelectedCardType] = useState("visa");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // MFS Gateways List
  const mfsList = [
    {
      id: "bkash",
      name: "bKash",
      code: "বিকাশ",
      src: "https://raw.githubusercontent.com/shafayat-tanvir/sslcommerz-logos/main/bkash.png",
      alt: "bKash",
      bg: "bg-pink-500/10 dark:bg-pink-500/20",
      border: "border-pink-500",
      text: "text-pink-600 dark:text-pink-400",
    },
    {
      id: "nagad",
      name: "Nagad",
      code: "নগদ",
      src: "https://raw.githubusercontent.com/shafayat-tanvir/sslcommerz-logos/main/nagad.png",
      alt: "Nagad",
      bg: "bg-orange-500/10 dark:bg-orange-500/20",
      border: "border-orange-500",
      text: "text-orange-600 dark:text-orange-400",
    },
    {
      id: "rocket",
      name: "Rocket",
      code: "রকেট",
      src: "https://raw.githubusercontent.com/shafayat-tanvir/sslcommerz-logos/main/rocket.png",
      alt: "Rocket",
      bg: "bg-purple-500/10 dark:bg-purple-500/20",
      border: "border-purple-500",
      text: "text-purple-600 dark:text-purple-400",
    },
    {
      id: "cellfin",
      name: "Cellfin",
      code: "সেলফিন",
      src: "https://raw.githubusercontent.com/shafayat-tanvir/sslcommerz-logos/main/cellfin.png",
      alt: "Cellfin",
      bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
      border: "border-emerald-500",
      text: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  // Bank Cards List
  const cardsList = [
    { id: "visa", name: "VISA", logo: "💳 Visa" },
    { id: "master", name: "Mastercard", logo: "🔴🟠 Master" },
    { id: "amex", name: "AMEX", logo: "💙 Amex" },
    { id: "nexus", name: "DBBL Nexus", logo: "🏦 Nexus" },
  ];

  // 🚀 রিয়েল ব্যাকএন্ড ইন্টিগ্রেশন হ্যান্ডলার
  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // প্রোডাক্ট ও শিপিং ডাটা (আপনার অ্যাপের প্রয়োজন অনুযায়ী ডায়নামিক করতে পারেন)
    const orderData = {
      products: [{ name: "Pro Subscription Plan", price: 1500 }],
      shippingAddress: {
        fullName: "Tanvir Hossain",
        email: "tanvir@example.com",
        fullAddress: "Dhaka, Bangladesh",
        city: "Dhaka",
        phone: phone || "01700000000",
      },
      totalAmount: 1500,
      paymentMethod: paymentMethod === "cod" ? "COD" : "ONLINE",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/payment/initiate-payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        },
      );

      const data = await response.json();

      if (data.isCOD) {
        // COD পছন্দ করলে সরাসরি সাকসেস পেজে রিডাইরেক্ট হবে
        alert("আপনার ক্যাশ অন ডেলিভারি অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে!");
        window.location.href = "/payment-success";
      } else if (data.url) {
        // Online Payment পছন্দ করলে SSLCommerz গেটওয়ে পেজে রিডাইরেক্ট হবে
        window.location.replace(data.url);
      } else {
        alert(data.message || "পেমেন্ট প্রসেস করতে সমস্যা হয়েছে!");
      }
    } catch (error) {
      console.error("Payment API Error:", error);
      alert("সার্ভারে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex items-center justify-center p-3 sm:p-6 transition-colors duration-300 font-sans">
        {/* Main Card */}
        <div className="w-full max-w-4xl bg-white dark:bg-slate-900/90 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800/80 overflow-hidden flex flex-col md:flex-row backdrop-blur-xl">
          {/* LEFT: Checkout Summary */}
          <div className="w-full md:w-5/12 bg-slate-50 dark:bg-slate-900/50 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
            <div>
              {/* Brand Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-600/30">
                    S
                  </div>
                  <div>
                    <h1 className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                      SSLCOMMERZ
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    </h1>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">
                      Secured Gateway
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsDark(!isDark)}
                  className="p-2.5 rounded-2xl bg-slate-200/60 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all"
                  title="Toggle Mode"
                >
                  {isDark ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-indigo-600" />
                  )}
                </button>
              </div>

              {/* Price Tag */}
              <div className="mb-6 p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
                <span className="text-xs font-semibold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                  মোট প্রদেয় মূল্য
                </span>
                <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                  ৳ ১,৫০০
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    .০০
                  </span>
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>ইনভয়েস নম্বর:</span>
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                    #INV-2026-992
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>সার্ভিস/প্রোডাক্ট:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    Pro Subscription Plan
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>ডেলিভারি চার্জ:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    ৳ ০.০০ (ফ্রি)
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-200 dark:border-slate-800/80">
              <div className="flex items-center gap-2.5 text-[11px] text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>
                  বাংলাদেশ ব্যাংক অনুমোদিত ২৫৬-বিট এসএসএল সুরক্ষিত পেমেন্ট
                  গেটওয়ে।
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Payment Options & Form */}
          <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  পেমেন্ট অপশন নির্বাচন করুন
                </h2>
                <HelpCircle className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
              </div>

              {/* Main Mode Selection: Online Payment vs COD */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("online")}
                  className={`p-3.5 rounded-2xl border-2 text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    paymentMethod === "online"
                      ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
                      : "border-slate-200 dark:border-slate-800 text-slate-500"
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>অনলাইন পেমেন্ট</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-3.5 rounded-2xl border-2 text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    paymentMethod === "cod"
                      ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                      : "border-slate-200 dark:border-slate-800 text-slate-500"
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>ক্যাশ অন ডেলিভারি</span>
                </button>
              </div>

              {/* Online Payment Tab Selection */}
              {paymentMethod === "online" && (
                <>
                  <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setTab("mobile")}
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all ${
                        tab === "mobile"
                          ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md"
                          : "text-slate-500"
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>মোবাইল ব্যাংকিং</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTab("card")}
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all ${
                        tab === "card"
                          ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md"
                          : "text-slate-500"
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>কার্ড পেমেন্ট</span>
                    </button>
                  </div>

                  {/* Mobile Banking Options */}
                  {tab === "mobile" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        {mfsList.map((mfs) => {
                          const active = selectedMFS === mfs.id;
                          return (
                            <div
                              key={mfs.id}
                              onClick={() => setSelectedMFS(mfs.id)}
                              className={`relative cursor-pointer p-3 rounded-2xl border-2 transition-all flex items-center justify-between ${
                                active
                                  ? `${mfs.border}${mfs.bg}`
                                  : "border-slate-200 dark:border-slate-800"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center bg-white p-1 shadow-sm">
                                  <img
                                    src={mfs.src}
                                    alt={mfs.alt}
                                    className="object-contain"
                                  />
                                </div>
                                <div>
                                  <p
                                    className={`font-bold text-xs ${mfs.text}`}
                                  >
                                    {mfs.name}
                                  </p>
                                  <p className="text-[10px] text-slate-400">
                                    {mfs.code}
                                  </p>
                                </div>
                              </div>
                              {active && (
                                <Check className={`w-4 h-4 ${mfs.text}`} />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          {selectedMFS.toUpperCase()} মোবাইল নম্বর
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          maxLength="11"
                          placeholder="017XXXXXXXX"
                          className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                        />
                      </div>
                    </div>
                  )}

                  {/* Card Options */}
                  {tab === "card" && (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        {cardsList.map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setSelectedCardType(c.id)}
                            className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                              selectedCardType === c.id
                                ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600"
                                : "border-slate-200 dark:border-slate-800 text-slate-500"
                            }`}
                          >
                            {c.logo}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 italic">
                        * কার্ড নম্বর সংক্রান্ত তথ্য SSLCommerz-এর নিরাপদ পেজে
                        পূরণ করা হবে।
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Cash on Delivery Notice */}
              {paymentMethod === "cod" && (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-xs leading-relaxed">
                  পণ্য হাতে পাওয়ার পর মূল্য পরিশোধ করুন। অর্ডার নিশ্চিত করতে
                  নিচের বাটনে ক্লিক করুন।
                </div>
              )}

              {/* Form Submit Button */}
              <form onSubmit={handlePayment}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-2xl transition-all shadow-lg shadow-indigo-600/30 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span>প্রসেসিং হচ্ছে...</span>
                  ) : paymentMethod === "cod" ? (
                    <>
                      <Truck className="w-4 h-4" />
                      <span>অর্ডার নিশ্চিত করুন (ক্যাশ অন ডেলিভারি)</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>৳ ১,৫০০ পেমেন্ট করুন</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="mt-4 text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                SSLCommerz Engine v4.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SSLPaymentCheckout;
