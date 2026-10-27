import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiHeart,
  FiMenu,
  FiX,
  FiShoppingBag,
  FiChevronRight,
  FiLogOut,
  FiShield,
  FiLayout,
  FiChevronDown,
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { IoIosMoon, IoIosSunny } from "react-icons/io";

export default function Navbar1({
  cartCount = 0,
  wishlistCount = 2,
  onCartOpen = () => {},
}) {
  const { theme, toggleTheme } = useTheme();
  const { user, userLogout } = useAuth();
  const navigate = useNavigate();

  console.log(user);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // স্ক্রল ইফেক্ট মনিটর
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "All Drops", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Elite Panjabi", path: "/shop/category/panjabi", tag: "EID" },
    { name: "Resort Shirts", path: "/shop/category/shirts" },
    { name: "Cyber Tees", path: "/shop/category/tshirt" },
    { name: "Cargo Pants", path: "/shop/category/pant" },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    try {
      const res = userLogout();
      console.log(res, "log");

      if (res.success) {
        setIsMenuOpen(false);
        alert(res.message);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-500 font-sans select-none antialiased">
      {/* মেইন নেভিগেশন বার */}
      <nav
        className={`w-full transition-all duration-300 border-b border-gray-200/80 dark:border-neutral-200/30 ${
          scrolled
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl  shadow-lg shadow-black/5 dark:shadow-white/5"
            : "bg-white dark:bg-neutral-950 py-2 md:py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-2 py-2.5 md:py-4 md:px-4">
          <div className="flex justify-between items-center gap-4">
            {/* লোগো সেকশন */}
            <div className="flex-shrink-0 ">
              <Link
                to="/"
                className="flex items-center gap-2 sm:gap-3 group focus:outline-none"
              >
                {/* Creative Geometric Diamond Badge */}
                <div className="relative flex items-center justify-center ">
                  {/* Background Subtle Glow on Hover */}
                  <div className="absolute inset-0 rotate-45 bg-[#C5A059]/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Diamond Shape Box */}
                  <div
                    className="relative w-7 sm:w-9 h-7 sm:h-9 rotate-45 border-2 border-[#C5A059] 
                        bg-slate-100/80 dark:bg-neutral-900/80 backdrop-blur-sm
                        group-hover:border-neutral-900 dark:group-hover:border-white 
                        shadow-sm group-hover:shadow-lg group-hover:shadow-[#C5A059]/20 
                        transition-all duration-500 rounded-lg flex items-center justify-center"
                  >
                    {/* Inner GZ Text */}
                    <span
                      className="-rotate-45 text-sm sm:text-[17px] font-black text-base text-[#C5A059] 
                    dark:text-[#E6C687] group-hover:scale-110 transition-all duration-300 select-none"
                    >
                      GZ
                    </span>
                  </div>
                </div>

                {/* Brand Identity Typography */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 leading-none">
                    {/* High-Contrast Dynamic Title */}
                    <span
                      className="font-black text-sm sm:text-lg tracking-wide 
                    text-neutral-900 dark:text-neutral-100 
                    group-hover:text-[#C5A059] dark:group-hover:text-[#E6C687] 
                    transition-colors duration-300 drop-shadow-xs"
                    >
                      GEN
                      <span className="text-[#C5A059] group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                        -
                      </span>
                      Z
                    </span>

                    {/* Eye-Catching Rotating Diamond Accent */}
                    <span className="w-2 h-2 rotate-45 bg-[#C5A059] shadow-md transition-all duration-500 group-hover:scale-125 group-hover:rotate-[225deg]" />
                  </div>

                  {/* EXPORT Subtitle */}
                  <div className="flex items-center ml-0.5">
                    <span
                      className="text-[7px] sm:text-[9px] font-extrabold tracking-[0.35em] uppercase 
                    text-[#C5A059] 
                    group-hover:text-neutral-950 dark:group-hover:text-white 
                    transition-colors duration-300"
                    >
                      EXPORT
                    </span>

                    {/* Expanding Decorative Glow Line */}
                    <span className="h-[2px] w-2 bg-[#C5A059] opacity-80 group-hover:w-4 transition-all duration-300 shadow-[0_0_6px_#C5A059]" />
                  </div>
                </div>
              </Link>
            </div>

            {/* ডেস্কটপ মেনু */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 relative flex items-center gap-2 hover:scale-105 ${
                      isActive
                        ? "bg-neutral-900 text-white dark:bg-[#C5A059] dark:text-neutral-950 shadow-sm"
                        : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    }`
                  }
                >
                  {item.name}
                  {item.tag && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md font-black bg-red-500 text-white animate-pulse">
                      {item.tag}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>

            {/* রাইট ইউটিলিটি হাব */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* থিম টগল বাটন */}
              <button
                onClick={toggleTheme}
                className={`relative w-12 sm:w-14 h-6 sm:h-7 rounded-full p-1 transition-all duration-500 border border-slate-200 dark:border-slate-700 shadow-inner focus:outline-none 
                               ${theme === "dark" ? "bg-slate-800" : "bg-slate-100"}`}
              >
                <div
                  className={`w-4 sm:w-5 h-4 sm:h-5 rounded-full shadow-md transform transition-transform duration-500 flex items-center justify-center
                               ${theme === "dark" ? "translate-x-6 sm:translate-x-7 bg-indigo-600" : "translate-x-0 bg-white"}`}
                >
                  {theme === "dark" ? (
                    <IoIosMoon className="w-3 h-3 text-white" />
                  ) : (
                    <IoIosSunny className="w-3 h-3 text-yellow-500" />
                  )}
                </div>
              </button>

              {/* নতুন মডার্ন সার্চ আইকন বাটন */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                  isSearchOpen
                    ? "bg-[#C5A059]/10 text-[#C5A059]"
                    : "text-neutral-600 dark:text-neutral-300 hover:text-[#C5A059] dark:hover:text-[#C5A059] hover:bg-neutral-100 dark:hover:bg-neutral-900"
                }`}
              >
                <FiSearch size={18} />
              </button>

              {/* উইশলিস্ট বাটন */}
              <Link
                to="/wishlist"
                className="p-2.5 rounded-xl transition-all duration-300 relative text-neutral-600 dark:text-neutral-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:scale-105 active:scale-95"
              >
                <FiHeart size={18} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-neutral-950 animate-ping"></span>
                )}
              </Link>

              {/* শপিং ব্যাগ কাউন্টার */}
              <Link
                to={"/cart"}
                onClick={onCartOpen}
                className="p-2.5 rounded-xl transition-all duration-300 relative group text-neutral-600 dark:text-neutral-300 hover:text-[#C5A059] dark:hover:text-[#C5A059] hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:scale-105 active:scale-95"
              >
                <FiShoppingBag
                  size={18}
                  className="group-hover:rotate-6 transition-transform"
                />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold bg-[#C5A059] text-neutral-950 ring-2 ring-white dark:ring-neutral-950">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* অথেন্টিকেশন বাটন (Desktop Only) */}
              <div
                className="hidden lg:flex items-center gap-2 ml-2"
                ref={menuRef}
              >
                {user ? (
                  <div className="relative">
                    {/* প্রোফাইল আইকন ও টগল বাটন */}
                    <button
                      type="button"
                      onClick={() => setIsMenuOpen((prev) => !prev)}
                      className="flex items-center gap-2 p-1.5 rounded-xl transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 focus:outline-none border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700/80 group cursor-pointer"
                    >
                      <div className="relative w-9 h-9">
                        {user?.photoURL ? (
                          <img
                            src={user?.avater}
                            alt={user?.name}
                            className="w-full h-full rounded-full object-cover border-2 border-[#C5A059] group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-[#C5A059] text-neutral-950 font-black text-sm flex items-center justify-center border-2 border-[#C5A059]">
                            {(user?.name || user?.email || "U")
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                        )}
                        {/* অনলাইন স্ট্যাটাস ইন্ডিকেটর */}
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-neutral-950"></span>
                      </div>

                      <FiChevronDown
                        className={`text-neutral-500 dark:text-neutral-400 group-hover:text-[#C5A059] transition-transform duration-300 ${
                          isMenuOpen ? "rotate-180 text-[#C5A059]" : ""
                        }`}
                        size={16}
                      />
                    </button>

                    {/* ================= ড্রপডাউন মেনু ================= */}
                    {isMenuOpen && (
                      <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl py-2 z-50 text-left animate-in fade-in slide-in-from-top-2 duration-200">
                        {/* ইউজার ইনফো হেডার */}
                        <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-800/80">
                          <p className="text-xs font-black text-neutral-900 dark:text-white truncate">
                            {user?.displayName || "User Account"}
                          </p>
                          <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 truncate">
                            {user?.email}
                          </p>
                          {user?.role === "admin" && (
                            <span className="inline-block mt-1.5 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-widest bg-[#C5A059]/15 text-[#C5A059] rounded-md border border-[#C5A059]/30">
                              Administrator
                            </span>
                          )}
                        </div>

                        {/* মেনু লিংক্স */}
                        <div className="p-1 space-y-0.5">
                          {/* অ্যাডমিন প্যানেল লিংক (যদি রোল admin হয়) */}
                          {user?.role === "admin" && (
                            <Link
                              to="/admin-dashboard"
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-700 dark:text-neutral-200 hover:bg-[#C5A059]/10 hover:text-[#C5A059] dark:hover:bg-[#C5A059]/10 dark:hover:text-[#C5A059] transition-all"
                            >
                              <FiShield size={15} className="text-[#C5A059]" />
                              <span>Admin Panel</span>
                            </Link>
                          )}

                          {/* ড্যাশবোর্ড লিংক */}
                          <Link
                            to="/dashboard"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-all"
                          >
                            <FiLayout size={15} />
                            <span>Dashboard</span>
                          </Link>
                        </div>

                        {/* লগআউট বাটন */}
                        <div className="p-1 border-t border-neutral-100 dark:border-neutral-800/80 mt-1">
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all cursor-pointer"
                          >
                            <FiLogOut size={15} />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-xs font-bold uppercase tracking-wider px-3.5 py-2 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 rounded-xl hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all duration-300"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-all duration-300 bg-[#C5A059] text-neutral-950 hover:bg-[#b08e4c] font-black shadow-sm"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>

              {/* মোবাইল মেনু ট্রিগার */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2.5 rounded-xl transition-all duration-300 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900"
              >
                <FiMenu size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* ড্রপডাউন ইনলাইন সার্চ বার (ফুল স্ক্রিন ওভারলে রিপ্লেস করা হয়েছে) */}
        <div
          className={`w-full overflow-hidden transition-all duration-300 ease-in-out bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800 ${
            isSearchOpen
              ? "max-h-20 opacity-100 py-3"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="max-w-3xl mx-auto px-4">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center"
            >
              <FiSearch className="text-[#C5A059] absolute left-4 text-base" />
              <input
                type="text"
                placeholder="What are you looking for today?..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-neutral-950 pl-11 pr-12 py-2.5 rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-400 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all duration-300"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
                >
                  <FiX size={16} />
                </button>
              )}
            </form>
          </div>
        </div>
      </nav>

      {/* মোবাইল ড্রয়ার মেনু */}
      <div
        className={`sm:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-neutral-950 p-6 flex flex-col justify-between transform transition-transform duration-300 shadow-2xl ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-wider text-neutral-950 dark:text-white">
                  GEN-Z
                </span>
                <span className="text-[10px] font-bold text-[#C5A059] tracking-wider">
                  EXP.
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-neutral-500 hover:text-neutral-950 dark:hover:text-white rounded-xl bg-neutral-100 dark:bg-neutral-900"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* মোবাইল নেভিগেশন লিংকসমূহ */}
            <div className="mt-6 space-y-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 ${
                      isActive
                        ? "bg-[#C5A059] text-neutral-950 shadow-sm"
                        : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-950 dark:hover:text-white"
                    }`
                  }
                >
                  <span>{item.name}</span>
                  <FiChevronRight size={16} className="opacity-70" />
                </NavLink>
              ))}
            </div>
          </div>

          {/* মোবাইল ফুটার অ্যাকশন বাটন */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
            {user ? (
              <div className="space-y-3">
                {/* মোবাইল ইউজার ইনফো কার্ড */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800">
                  <div className="relative w-10 h-10 flex-shrink-0">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user?.displayName || "User Profile"}
                        className="w-full h-full rounded-full object-cover border-2 border-[#C5A059]"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-[#C5A059] text-neutral-950 font-black text-sm flex items-center justify-center border-2 border-[#C5A059]">
                        {(user?.displayName || user?.email || "U")
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    )}
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-neutral-900"></span>
                  </div>

                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-xs font-black text-neutral-900 dark:text-white truncate">
                      {user?.displayName || "User Account"}
                    </p>
                    <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 truncate">
                      {user?.email}
                    </p>
                  </div>

                  {user?.role === "admin" && (
                    <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-widest bg-[#C5A059]/15 text-[#C5A059] rounded-md border border-[#C5A059]/30">
                      Admin
                    </span>
                  )}
                </div>

                {/* মোবাইল নেভিগেশন বাটন গ্রিড */}
                <div
                  className={`grid ${user?.role === "admin" ? "grid-cols-1" : "grid-cols-2"} gap-2`}
                >
                  {user?.role === "admin" && (
                    <Link
                      to="/admin-dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full py-2.5 px-3 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#C5A059]/20 transition-all active:scale-[0.98]"
                    >
                      <FiShield size={15} />
                      <span>Admin Panel</span>
                    </Link>
                  )}

                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2.5 px-3 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98]"
                  >
                    <FiUser size={15} className="text-[#C5A059]" />
                    <span>Dashboard</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (handleLogout) handleLogout();
                    }}
                    className="py-2.5 px-3 border border-rose-500/20 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <FiLogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              /* লগইন না থাকা অবস্থায় বাটন */
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 border border-neutral-300 dark:border-neutral-700 text-center text-neutral-800 dark:text-neutral-200 font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-[0.98] transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 bg-[#C5A059] text-neutral-950 text-center font-black text-xs tracking-widest uppercase rounded-xl hover:bg-[#b08e4c] active:scale-[0.98] shadow-sm transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          {/*  */}
        </div>
      </div>
    </header>
  );
}
