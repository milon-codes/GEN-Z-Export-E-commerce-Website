import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTrash,
  FaArrowLeft,
  FaShoppingBag,
  FaPlus,
  FaMinus,
  FaTicketAlt,
  FaLock,
} from "react-icons/fa";
import { useProducts } from "../../context/ProductContext";
import { toast } from "sonner";

const Cart = () => {
  const { cart, setCart } = useProducts();

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0); // BDT flat discount

  // কোয়ান্টিটি হ্যান্ডলার
  const updateQuantity = (id, type) => {
    console.log(id, "idddd");

    setCart((prev) =>
      prev.map((item) => {
        if (item._id === id) {
          if (type === "inc" && item.quantity < item.stock) {
            return { ...item, quantity: item.quantity + 1 };
          } else if (type === "dec" && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      }),
    );
  };

  // কার্ট থেকে আইটেম ডিলিট
  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.success("কার্টে যুক্ত করা হয়েছে!", {
      id: `cart-success-${product.id}`,
      description: "চেকআউট করতে আপনার কার্ট পেজে যান।",
    });
  };

  // হিসেব-নিকেশ
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shippingFee = subtotal > 2000 ? 0 : 80; // ২০০০ টাকার উপরে ফ্রি ডেলিভারি
  const total = subtotal + shippingFee - discount;

  // কুপন কোড অ্যাপ্লাই (ডামি লজিক)
  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "PREMIUM10") {
      setDiscount(200); // BDT 200 flat discount
      alert("Coupon Applied Successfully! You saved 200 BDT.");
    } else {
      alert("Invalid Coupon Code");
    }
  };

  // কার্ট খালি থাকলে যা দেখাবে
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-zinc-950 text-center">
        <div className="w-20 h-20 bg-amber-50 dark:bg-amber-950/10 text-[#C5A059] rounded-full flex items-center justify-center mb-6 animate-bounce">
          <FaShoppingBag size={32} />
        </div>
        <h2 className="text-xl font-black text-slate-950 dark:text-white mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-xs md:text-sm text-slate-500 dark:text-zinc-400 max-w-xs mx-auto mb-6 leading-relaxed">
          Looks like you haven't added anything to your cart yet. Let's find
          some premium outfits for you!
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A059] text-zinc-950 font-bold text-xs rounded-xl hover:bg-[#b08e4f] active:scale-95 transition-all shadow-md"
        >
          <FaArrowLeft size={10} /> Explore Shop
        </Link>
      </div>
    );
  }

  console.log(cart, "cart cc");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pt-28 md:p-32 pb-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 🏷️ পেজ হেডার */}
        <div className="flex items-center justify-between mb-8 border-b border-slate-200/40 dark:border-zinc-800 pb-5">
          <div>
            <h1 className="text-2xl font-black text-slate-950 dark:text-white flex items-center gap-2.5">
              Shopping Cart{" "}
              <span className="text-sm font-bold bg-[#C5A059]/10 text-[#C5A059] px-2.5 py-0.5 rounded-full">
                {cart.length}
              </span>
            </h1>
            <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
              Manage your items and proceed to checkout.
            </p>
          </div>
          <Link
            to={-1}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-zinc-400 hover:text-[#C5A059] transition-colors group"
          >
            <FaArrowLeft
              size={10}
              className="group-hover:-translate-x-1 transition-transform"
            />{" "}
            Back to Shop
          </Link>
        </div>

        {/* 📦 মেইন গ্রিড লেআউট */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 🛒 ১. বাম পাশ (২ কলাম): কার্ট প্রোডাক্ট লিস্ট */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 p-4 rounded-2xl shadow-sm hover:shadow-md/5 transition-all"
              >
                {/* ইমেজ ও প্রোডাক্ট ডিটেইলস */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-20 h-20 bg-slate-100 dark:bg-zinc-800/40 rounded-xl overflow-hidden border border-slate-200/30 dark:border-zinc-800/50 shrink-0">
                    <img
                      src={item.images[0].url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5A059]">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-950 dark:text-white line-clamp-1">
                      {item.title}
                    </h3>

                    {/* ভেরিয়েন্ট চিপস */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] font-bold bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 px-2 py-0.5 rounded">
                        Size:{" "}
                        {item.sizes.map((s) => (
                          <span>{s}</span>
                        ))}
                      </span>
                      <span className="text-[10px] font-bold bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 px-2 py-0.5 rounded">
                        Color:{item.colors}
                        {item.colors.map((c) => (
                          <span>{c}</span>
                        ))}
                      </span>
                    </div>
                  </div>
                </div>

                {/* কোয়ান্টিটি, প্রাইস ও রিমুভ বাটন */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-zinc-800">
                  {/* কোয়ান্টিটি চেঞ্জার */}
                  <div className="flex items-center border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 rounded-xl p-0.5 shrink-0">
                    <button
                      onClick={() => updateQuantity(item._id, "dec")}
                      className="p-2 text-slate-500 dark:text-zinc-400 hover:text-[#C5A059]"
                    >
                      <FaMinus size={8} />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-slate-800 dark:text-zinc-200">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item._id, "inc")}
                      className="p-2 text-slate-500 dark:text-zinc-400 hover:text-[#C5A059]"
                    >
                      <FaPlus size={8} />
                    </button>
                  </div>

                  {/* টোটাল প্রাইস (দাম * কোয়ান্টিটি) */}
                  <div className="text-right min-w-[90px]">
                    <p className="text-sm font-black text-slate-950 dark:text-white">
                      {item.price * item.quantity} {item.currency}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-[10px] text-slate-400 font-medium">
                        {item.price} {item.currency} / unit
                      </p>
                    )}
                  </div>

                  {/* ডিলিট বাটন */}
                  <button
                    onClick={() => removeItem(item._id)}
                    className="p-2.5 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 💵 ২. ডান পাশ (১ কলাম): অর্ডার সামারি ও চেকআউট */}
          <div className="space-y-4">
            {/* কুপন কোড সেকশন */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 p-5 rounded-2xl shadow-sm">
              <h3 className="text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-2 mb-3">
                <FaTicketAlt className="text-[#C5A059]" /> Promo / Coupon Code
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. PREMIUM10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 min-w-0 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-[#C5A059]"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-zinc-950 dark:bg-zinc-100 hover:bg-zinc-900 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs font-bold px-4 py-2 rounded-xl transition-all"
                >
                  Apply
                </button>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-2">
                Use code{" "}
                <span className="font-bold text-[#C5A059]">PREMIUM10</span> to
                get 200 BDT discount!
              </p>
            </div>

            {/* অর্ডার হিসাব-নিকাশ প্যানেল */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 p-5 rounded-2xl shadow-sm space-y-4">
              <h3 className="text-sm font-black text-slate-950 dark:text-white pb-3 border-b border-slate-100 dark:border-zinc-800">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800 dark:text-zinc-200">
                    {subtotal} BDT
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-rose-500">
                    <span>Discount</span>
                    <span className="font-semibold">- {discount} BDT</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                  <span>Delivery Charge</span>
                  <span className="font-semibold text-slate-800 dark:text-zinc-200">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-500">Free</span>
                    ) : (
                      `${shippingFee} BDT`
                    )}
                  </span>
                </div>

                {shippingFee > 0 && (
                  <p className="text-[9px] text-slate-400 text-right">
                    Add {2000 - subtotal} BDT more for{" "}
                    <span className="font-bold text-emerald-500">
                      Free Shipping
                    </span>
                    !
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-baseline">
                <span className="text-sm font-black text-slate-950 dark:text-white">
                  Estimated Total
                </span>
                <span className="text-lg font-black text-[#C5A059]">
                  {total} BDT
                </span>
              </div>

              {/* চেকআউট বাটন */}
              <Link
                to={"/checkout"}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#C5A059] hover:bg-[#b08e4f] text-zinc-950 text-xs font-black rounded-xl transition-all shadow-md"
              >
                <FaLock size={10} /> Proceed to Checkout
              </Link>

              <div className="text-center">
                <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
                  🛡️ 100% Safe & Secure Payment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
