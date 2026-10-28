import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiTruck,
  FiShield,
  FiRotateCcw,
  FiDollarSign,
} from "react-icons/fi";

import { useProducts } from "../../context/ProductContext";
import HomeBanner from "../../components/HomeBanner";
import ProductCard from "./ProductCart";
import CustomerChat from "../../components/CustomerChatbot";

const Home = () => {
  const { allProduct = [], isLoading } = useProducts();

  const [isOpen, setIsOpen] = useState(false);

  // প্রথম ৪টি প্রোডাক্টকে ফিচারড হিসেবে দেখানোর জন্য safe slice
  const featuredProducts = Array.isArray(allProduct)
    ? allProduct.slice(0, 4)
    : [];

  const categories = [
    {
      name: "Elite Panjabi",
      path: "/shop/category/panjabi",
      image:
        "https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=600&auto=format&fit=crop",
      tag: "EID DROP",
    },
    {
      name: "Resort Shirts",
      path: "/shop/category/shirts",
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop",
      tag: "NEW",
    },
    {
      name: "Cyber Tees",
      path: "/shop/category/tshirt",
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop",
      tag: "HOT",
    },
    {
      name: "Cargo Pants",
      path: "/shop/category/pant",
      image:
        "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?q=80&w=600&auto=format&fit=crop",
      tag: "STREET",
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-zinc-950 text-neutral-900 dark:text-neutral-100 min-h-screen font-sans selection:bg-[#C5A059] selection:text-black">
      <HomeBanner />

      {/* ১. ট্রাস্ট ফ্যাক্টর / ফিচারস বার */}
      <section className="max-w-7xl mx-auto px-2  sm:px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4  sm:gap-6 bg-neutral-50 dark:bg-zinc-900/40 border border-neutral-100 dark:border-white/5 rounded-2xl p-4 sm:p-6 sm:p-8">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-cyan-100 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 rounded-xl">
              <FiTruck size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm">Nationwide Delivery</h4>
              <p className="text-xs text-neutral-500">Fast & secured cargo</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-amber-100 dark:bg-[#C5A059]/10 text-amber-600 dark:text-[#C5A059] rounded-xl">
              <FiShield size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm">Premium Quality</h4>
              <p className="text-xs text-neutral-500">100% Export grade</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-xl">
              <FiRotateCcw size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm">7-Day Exchange</h4>
              <p className="text-xs text-neutral-500">
                Hassle-free return policy
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <FiDollarSign size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm">Secure Checkout</h4>
              <p className="text-xs text-neutral-500">Bkash, Nagad or Cards</p>
            </div>
          </div>
        </div>
      </section>

      {/* ২. ক্যাটাগরি গ্রিড (Shop By Category) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="text-left mb-8">
          <span className="text-[10px] font-black tracking-widest text-cyan-600 dark:text-[#C5A059] uppercase">
            COLLECTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Shop By Category
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.path}
              className="group relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-sm block"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-[8px] sm:text-[9px] font-black tracking-wider text-white px-2 py-0.5 rounded border border-white/10">
                {cat.tag}
              </span>

              <div className="absolute bottom-4 left-4 right-4 text-left flex justify-between items-center">
                <div>
                  <h3 className="font-black text-sm sm:text-base text-white tracking-tight">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] text-gray-300 font-medium">
                    Browse Collection
                  </span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-cyan-600 dark:group-hover:bg-[#C5A059] dark:group-hover:text-zinc-950 transition-colors">
                  <FiArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ৩. ফিচারড প্রোডাক্টস (Featured Products) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-8 border-b border-slate-200/50 dark:border-zinc-800 pb-4">
          <div className="text-left space-y-1">
            <span className="text-[10px] font-black tracking-widest text-[#C5A059] uppercase">
              CURATED DROPS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              Trending Right Now
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-black tracking-widest uppercase text-[#C5A059] flex items-center gap-2 hover:underline transition-all group"
          >
            View All Shop{" "}
            <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 text-left">
          {isLoading ? (
            /* ১. ডাটা লোড হওয়ার সময়ে Skeleton Loader */
            [1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800/60 rounded-3xl p-3.5 space-y-4 animate-pulse"
              >
                <div className="aspect-[4/5] bg-slate-200 dark:bg-zinc-800 rounded-2xl"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-200 dark:bg-zinc-800 rounded w-1/3"></div>
                  <div className="h-4 bg-slate-200 dark:bg-zinc-800 rounded w-3/4"></div>
                </div>
              </div>
            ))
          ) : featuredProducts.length > 0 ? (
            /* ২. ডাটা থাকলে Clean ProductCard রেন্ডার */
            featuredProducts.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))
          ) : (
            /* ৩. ডাটা লোড হওয়ার পরও ডাটা না থাকলে Empty Fallback */
            <div className="col-span-full text-center py-16 bg-zinc-900/40 rounded-3xl border border-dashed border-zinc-800/80">
              <p className="text-zinc-400 font-bold text-sm">
                No trending products available right now.
              </p>
              <Link
                to="/shop"
                className="inline-block mt-4 px-5 py-2.5 bg-[#C5A059] text-zinc-950 font-black text-xs rounded-xl hover:bg-[#b08e4d] transition-all shadow-md active:scale-95"
              >
                BROWSE ALL PRODUCTS
              </Link>
            </div>
          )}
        </div>

        {/* Floating AI Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center space-x-2 sm:space-x-2.5 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F48] hover:from-[#B38F48] hover:via-[#C5A059] hover:to-[#A37E37] text-neutral-950 px-2 sm:px-4 py-1 sm:py-2 rounded-full shadow-[0_10px_25px_-5px_rgba(197,160,89,0.4)] transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/40 font-bold group cursor-pointer border border-[#FFE29A]/30"
        >
          <div className="relative flex items-center justify-center">
            {/* গোল্ডেন পিং প্যাকগ্রাউন্ড অ্যানিমেশন */}
            <span className="absolute inline-flex h-4 sm:h-5 w-4 sm:w-5 rounded-full bg-[#FFE29A] opacity-75 animate-ping group-hover:opacity-100"></span>
            <span className="relative text-base transform group-hover:rotate-6 transition-transform duration-300">
              ✨
            </span>
          </div>
          <span className="text-sm font-semibold tracking-wide uppercase">
            Ask AI
          </span>
        </button>

        {/* AI Chat Modal */}
        <CustomerChat isOpen={isOpen} onClose={() => setIsOpen(false)} />
        {/*  */}
      </section>
    </div>
  );
};

export default Home;
