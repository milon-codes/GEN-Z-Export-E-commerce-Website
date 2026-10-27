import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiShield,
  FiCreditCard,
  FiLogOut,
  FiShoppingBag,
  FiTruck,
  FiAlertCircle,
  FiSettings,
} from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import GlobalLoader from "../../components/GlobalLoader";
import ProfileUpdate from "./ProfileUpdate";
import { useTheme } from "../../context/ThemeContext";
import { IoIosMoon, IoIosSunny, IoMdNotifications } from "react-icons/io";

const Dashboard = () => {
  const { user, myOrder, isLoading, loading, setSuccessMsg, userLogout } =
    useAuth();

  const { theme, toggleTheme } = useTheme();

  console.log("user data", user);

  // Settings Popup Modal State
  const [isSetting, setIsSetting] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    userLogout();
    setTimeout(() => {
      navigate("/login");
      if (setSuccessMsg) setSuccessMsg("");
    }, 2000);
  };

  // Safe Guard
  if (isLoading || loading || !user) {
    return <GlobalLoader />;
  }

  const safeOrders = myOrder || [];
  const totalSpent = safeOrders.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0,
  );
  const processingOrders = safeOrders.filter(
    (o) => o.orderStatus === "Processing" || o.orderStatus === "Pending",
  ).length;
  const completedOrders = safeOrders.filter(
    (o) => o.orderStatus === "Delivered",
  ).length;

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-emerald-500/10 border-emerald-500/20 text-emerald-500";
      case "processing":
      case "pending":
        return "bg-amber-500/10 border-amber-500/20 text-amber-500";
      case "cancelled":
        return "bg-rose-500/10 border-rose-500/20 text-rose-500";
      default:
        return "bg-neutral-100 border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 text-neutral-400";
    }
  };

  console.log(user?.notifications, "nnn");

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans antialiased transition-colors duration-500 select-none relative">
      <nav className=" sticky top-0 z-50 bg-white dark:bg-neutral-950 flex justify-between items-center px-4 py-3">
        {/* logo */}
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
        <ul className="flex items-center gap-2">
          <li>
            <Link
              to={"/"}
              className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 relative flex items-center gap-2 hover:scale-105
             text-white bg-neutral-900 dark:bg-[#C5A059] dark:text-neutral-950 shadow-sm text-neutral-600"
            >
              All Drops
            </Link>
          </li>

          <li>
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
          </li>
          {/* 🔔 নোটিফিকেশন ব্যাজ */}
          <li>
            <button className="relative p-2 rounded-xl text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800/60 transition-colors duration-200 focus:outline-none">
              <IoMdNotifications size={24} />
              <span className="absolute w-4 h-4 flex items-center justify-center rounded-full right-1 top-1 text-[10px] font-bold text-white bg-rose-600 shadow-sm ring-2 ring-white dark:ring-zinc-900">
                {user?.notifications.length}
              </span>
            </button>
          </li>
        </ul>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mt-5">
        {/* ================= HEADER HERO BANNER ================= */}
        <div className="relative rounded-[2rem] bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 p-6 sm:p-10 overflow-hidden shadow-xl">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#C5A059]/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-left">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-[#C5A059]/30 bg-neutral-800 text-[#C5A059] font-black flex items-center justify-center overflow-clip text-xl tracking-tighter shadow-lg relative">
                <img
                  src="/profile.jpg"
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                    {user?.name}
                  </h1>

                  {user?.role === "admin" && (
                    <Link
                      to={"/admin-dashboard"}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border border-[#C5A059]/40 bg-[#C5A059]/10 text-[#C5A059] text-[12px] font-black tracking-widest uppercase"
                    >
                      <FiShield size={18} /> Admin Panel
                    </Link>
                  )}
                </div>
                {user?.isVerified && (
                  <div className="flex items-center gap-2">
                    <span className="text-white font-black tracking-wide">
                      Verified
                    </span>
                    <FiCheckCircle size={18} className="text-green-600" />
                  </div>
                )}
                <p className="text-xs text-neutral-400 font-medium tracking-wide">
                  Identity Node ID:{" "}
                  <span className="font-mono text-[11px] text-neutral-500">
                    {user?._id}
                  </span>
                </p>
                <p className="text-xs text-neutral-400 font-medium tracking-wide">
                  Join Date:{" "}
                  <span className="font-mono text-[11px] text-neutral-500">
                    {user?.createdAt}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSetting(true)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl border border-neutral-700 text-neutral-300 bg-neutral-800/50 hover:bg-[#C5A059]/20 hover:text-[#C5A059] hover:border-[#C5A059]/40 transition-all duration-300 shadow-sm"
              >
                <FiSettings className="text-sm" />
                <span>Settings</span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl border border-neutral-700 text-neutral-300 bg-neutral-800/50 hover:bg-rose-950/40 hover:text-rose-400 hover:border-rose-900/60 transition-all duration-300 shadow-sm"
              >
                <FiLogOut className="text-sm" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= METRICS SUMMARY CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl p-5 flex items-center justify-between text-left shadow-sm">
            <div>
              <span className="block text-[10px] font-black uppercase tracking-wider text-neutral-400">
                Total Pipeline Investments
              </span>
              <span className="text-xl font-black text-[#C5A059]">
                {user?.totalSpent.toLocaleString()} BDT
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center">
              <FiCreditCard size={20} />
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl p-5 flex items-center justify-between text-left shadow-sm">
            <div>
              <span className="block text-[10px] font-black uppercase tracking-wider text-neutral-400">
                Active Transmissions
              </span>
              <span className="text-xl font-black text-amber-500">
                {user?.totalOrders} Orders
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <FiTruck
                size={20}
                className={processingOrders > 0 ? "animate-bounce" : ""}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl p-5 flex items-center justify-between text-left shadow-sm">
            <div>
              <span className="block text-[10px] font-black uppercase tracking-wider text-neutral-400">
                Successful Deliveries
              </span>
              <span className="text-xl font-black text-emerald-500">
                {completedOrders} Logged
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <FiCheckCircle size={20} />
            </div>
          </div>
        </div>

        {/* ================= PRIMARY GRID CONTENT SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: PROFILE DETAILS */}
          <div className="lg:col-span-4 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-[2rem] p-6 space-y-6 text-left shadow-sm">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[#C5A059] border-b border-neutral-100 dark:border-neutral-800/60 pb-3">
              Identity Framework Mappings
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-950 text-neutral-500 group-hover:text-[#C5A059] flex items-center justify-center border border-neutral-200/40 dark:border-neutral-800/40 transition-colors">
                  <FiUser size={15} />
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-wider text-neutral-400">
                    Full Registered Identity
                  </span>
                  <span className="text-xs font-bold tracking-wide">
                    {user?.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-950 text-neutral-500 group-hover:text-[#C5A059] flex items-center justify-center border border-neutral-200/40 dark:border-neutral-800/40 transition-colors">
                  <FiMail size={15} />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-[10px] font-black uppercase tracking-wider text-neutral-400">
                    Secure Account Email
                  </span>
                  <span className="text-xs font-bold tracking-wide break-all">
                    {user?.email}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-950 text-neutral-500 group-hover:text-[#C5A059] flex items-center justify-center border border-neutral-200/40 dark:border-neutral-800/40 transition-colors">
                  <FiPhone size={15} />
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-wider text-neutral-400">
                    Communication Mobile Node
                  </span>
                  <span className="text-xs font-bold tracking-wide font-mono">
                    {user?.phone || "Not Configured"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-950 text-neutral-500 group-hover:text-[#C5A059] flex items-center justify-center border border-neutral-200/40 dark:border-neutral-800/40 transition-colors">
                  <FiMapPin size={15} />
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-wider text-neutral-400">
                    Default Drop Destination
                  </span>
                  <span className="text-xs font-bold tracking-wide capitalize">
                    {user?.address || "No Address Logged"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ORDERS */}
          <div className="lg:col-span-8 space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-neutral-200/60 dark:border-neutral-800/60 pb-3">
              <h3 className="font-black text-sm uppercase tracking-wider flex items-center gap-2">
                <FiPackage size={16} className="text-[#C5A059]" /> Transmission
                Pipeline Tracker
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-400 font-bold text-[10px] border border-neutral-200/40 dark:border-neutral-800/60">
                Total Logs: {safeOrders.length}
              </span>
            </div>

            {safeOrders.length === 0 && (
              <div className="p-12 text-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2rem] space-y-4 flex flex-col items-center justify-center shadow-sm">
                <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center text-neutral-400">
                  <FiAlertCircle size={22} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-black uppercase tracking-wider">
                    No Transaction Logs Registered
                  </p>
                  <p className="text-xs text-neutral-400">
                    You haven't ordered any premium apparel yet.
                  </p>
                </div>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white dark:bg-[#C5A059] dark:text-neutral-950 text-xs font-black uppercase tracking-wider rounded-xl transition-all hover:opacity-90 shadow-md"
                >
                  <FiShoppingBag /> Teleport To Shop
                </Link>
              </div>
            )}

            <div className="space-y-4">
              {safeOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-3xl p-5 space-y-4 hover:border-[#C5A059]/30 transition-all duration-300 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800/60 pb-3">
                    <div className="space-y-0.5">
                      <span className="block text-[9px] font-black uppercase text-neutral-400 tracking-widest">
                        Pipeline Target ID
                      </span>
                      <span className="text-xs font-mono font-bold tracking-tight text-[#C5A059]">
                        {order._id}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-wider rounded-lg">
                        <FiCreditCard size={11} />{" "}
                        {order.paymentMethod || "COD"}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border ${getStatusStyles(order.orderStatus)}`}
                      >
                        <FiClock
                          size={11}
                          className={
                            order.orderStatus === "Processing"
                              ? "animate-spin"
                              : ""
                          }
                          style={{ animationDuration: "4s" }}
                        />
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {order.products?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/30 dark:border-neutral-800/30 rounded-xl p-3"
                      >
                        <div className="flex items-center gap-2.5 text-left">
                          <div className="w-9 h-9 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-black text-[10px] text-neutral-500">
                            PKG
                          </div>
                          <div>
                            <span className="block text-xs font-black uppercase tracking-tight">
                              Apparel Item Sequence
                            </span>
                            <span className="block text-[10px] font-mono text-neutral-400">
                              ID: {item.productId}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="block text-xs font-black tracking-tight">
                            {item.price} BDT
                          </span>
                          <span className="block text-[10px] font-bold text-neutral-400">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-black uppercase">
                    <div className="flex items-center gap-1.5 text-neutral-400 text-[10px]">
                      <FiClock size={12} /> Logged:
                      <span className="font-bold tracking-tight text-neutral-500 dark:text-neutral-400 font-mono">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )
                          : "Pending"}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-neutral-400 pr-1 tracking-wider">
                        NET AGGREGATE PAYLOAD:
                      </span>
                      <span className="text-sm text-[#C5A059] tracking-tight">
                        {order.totalPrice} BDT
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= PROFILE UPDATE MODAL COMPONENT ================= */}
      <ProfileUpdate
        isOpen={isSetting}
        onClose={() => setIsSetting(false)}
        currentUser={user}
        onUpdateSuccess={() => {
          // রিলোড বা ডাটা সিঙ্ক যদি দরকার হয়
          window.location.reload();
        }}
      />
    </div>
  );
};

export default Dashboard;
