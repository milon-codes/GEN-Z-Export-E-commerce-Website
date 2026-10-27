import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "./Navbar";
import { IoMdNotifications, IoMdSearch } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";

const AdminLayout = () => {
  const { user } = useAuth();

  // ডেমো লগআউট ফাংশন (প্রয়োজন হলে পাস করতে পারেন)
  const handleLogout = () => {
    console.log("Logged out successfully");
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen font-sans bg-slate-50 text-slate-900 dark:text-zinc-100 dark:bg-zinc-950 transition-colors duration-300">
      {/* 🧭 ১. সাইডবার / রেসপন্সিভ নেভিগেশন */}
      <Navbar handleLogout={handleLogout} />

      {/* 🖥️ ২. মেইন কন্টেন্ট এরিয়া */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 顶部 হেডার সেকশন */}
        <header className="h-16 px-4 md:px-6 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800/80 flex justify-between items-center sticky top-0 z-30 backdrop-blur-md bg-white/80 dark:bg-zinc-900/80 transition-colors duration-300">
          {/* বাম পাশ: টাইটেল */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
              Dashboard
            </h2>
          </div>

          {/* ডান পাশ: সার্চ বার, নোটিফিকেশন ও প্রোফাইল */}
          <div className="flex items-center gap-3 md:gap-5">
            <div>
              <Link to={"/"}>View Website</Link>
            </div>

            {/* 🔔 নোটিফিকেশন ব্যাজ */}
            <button className="relative p-2 rounded-xl text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800/60 transition-colors duration-200 focus:outline-none">
              <IoMdNotifications size={24} />
              <span className="absolute w-4 h-4 flex items-center justify-center rounded-full right-1 top-1 text-[10px] font-bold text-white bg-rose-600 shadow-sm ring-2 ring-white dark:ring-zinc-900">
                5
              </span>
            </button>

            {/* 🪞 প্রোফাইল সেকশন */}
            <div className="flex items-center gap-2.5 border-l border-slate-200 dark:border-zinc-800 pl-3 md:pl-5">
              {/* প্রোফাইল ইমেজ */}
              <div className="w-9 h-9 rounded-xl overflow-hidden ring-2 ring-slate-100 dark:ring-zinc-800 flex-shrink-0">
                <img
                  src={user?.avatar}
                  className="w-full h-full object-cover"
                  alt={user?.name}
                  onError={(e) => {
                    // ইমেজ লোড না হলে ফলব্যাক হিসেবে ইনিশিয়াল দেখাবে
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="w-full h-full rounded-full bg-[#C5A059] text-neutral-950 font-black text-sm flex items-center justify-center border-2 border-[#C5A059]">
                  {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
                </div>
              </div>

              {/* নাম এবং রোল (মোবাইলে স্পেস বাঁচাতে হাইড থাকবে, বড় স্ক্রিনে দেখাবে) */}
              <Link
                to="/admin-dashboard/profile"
                className="hidden sm:flex flex-col items-start leading-none group"
              >
                <span className="text-sm font-bold text-slate-800 dark:text-zinc-200 group-hover:text-[#C5A059] dark:group-hover:text-[#C5A059] transition-colors duration-200">
                  Md Milon Mia
                </span>
                <span className="text-[11px] font-semibold text-slate-400 dark:text-zinc-500 mt-0.5">
                  Super Admin
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* 📉 মেইন রাউট এরিয়া (যেখানে সব পেজ রেন্ডার হবে) */}
        <main className="flex-1 p-4 md:p-6 bg-slate-50 dark:bg-zinc-950 overflow-y-auto transition-colors duration-300">
          <div className="max-w-[1600px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
