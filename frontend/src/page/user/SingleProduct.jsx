import { useContext, useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import {
  FaStar,
  FaShoppingBag,
  FaArrowLeft,
  FaPlus,
  FaMinus,
  FaCheck,
  FaQuestionCircle,
  FaCommentDots,
  FaPaperPlane,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaTimes,
} from "react-icons/fa";

import ProductCard from "./ProductCart";

const SingleProduct = () => {
  const { slug } = useParams();
  const {
    allProduct = [],
    searchQuery = "",
    setSearchOuery: setSearchQuery,
    cart,
    addToCart,
    favorites,
    addToFavorites,
    removeFromFavorites,
  } = useContext(ProductContext);

  // 🛠️ সিলেক্টেড ভেরিয়েশন ও কোয়ান্টিটি স্টেট
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  // 🖼️ স্লাইডার ও গ্যালারি স্টেট
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // 💬 কাস্টমার Q&A এবং রিভিউ স্টেট
  const [questionInput, setQuestionInput] = useState("");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      user: "রাকিব হাসান",
      question: "এটার কালার কি ওয়াশ করলে উঠে যাবে?",
      answer:
        "না ভাইয়া, এটি প্রিমিয়াম কালার ফাস্টনেস গ্যারান্টিযুক্ত ফ্যাব্রিক।",
    },
    {
      id: 2,
      user: "আরিফ আহমেদ",
      question: "ঢাকা সিটির বাইরে ডেলিভারি দিতে কতদিন লাগবে?",
      answer: "ঢাকার বাইরে সাধারণত ২-৩ কার্যদিবসের মধ্যে ডেলিভারি পেয়ে যাবেন।",
    },
  ]);

  const [reviewInput, setReviewInput] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "মাহিন খান",
      rating: 5,
      comment:
        "অসাধারণ কোয়ালিটি! ঠিক যেমনটা ছবিতে দেখেছি তেমনটাই পেয়েছি। ধন্যবাদ!",
      date: "12 July 2026",
    },
    {
      id: 2,
      user: "জসিম উদ্দিন",
      rating: 4,
      comment: "ফিটিং একদম পারফেক্ট। কাপড়টাও বেশ আরামদায়ক।",
      date: "05 July 2026",
    },
  ]);

  const product = allProduct.find((p) => p.slug == slug);

  // 🔄 প্রোডাক্ট চেঞ্জ হলে ইমেজ ইনডেক্স রিসেট
  useEffect(() => {
    setActiveImageIndex(0);
  }, [slug]);

  // ⏱️ Auto Slide Logic (৩ সেকেন্ড পর পর স্লাইড হবে)
  useEffect(() => {
    let interval;
    const imagesList = product?.images || [];

    if (isAutoPlay && imagesList.length > 1) {
      interval = setInterval(() => {
        setActiveImageIndex((prevIndex) =>
          prevIndex === imagesList.length - 1 ? 0 : prevIndex + 1,
        );
      }, 3500);
    }

    return () => clearInterval(interval);
  }, [isAutoPlay, product?.images]);

  // 🔄 ১. Related Products (একই ক্যাটাগরির প্রোডাক্ট)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allProduct
      .filter((p) => p.category === product.category && p.slug != product.slug)
      .slice(0, 4);
  }, [allProduct, product]);

  // 🌍 ২. Other Categories Products
  const otherCategoriesProducts = useMemo(() => {
    if (!product) return [];
    return allProduct
      .filter((p) => p.category !== product.category && p.slug != product.slug)
      .slice(0, 4);
  }, [allProduct, product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-5 bg-slate-50 dark:bg-zinc-950 text-center">
        <p className="text-lg font-bold text-slate-500 dark:text-zinc-400 mb-4">
          Oops! Product not found.
        </p>
        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#C5A059] text-zinc-950 font-bold text-sm rounded-xl hover:bg-[#b08e4f] transition-all"
        >
          <FaArrowLeft size={12} /> Back to Shop
        </Link>
      </div>
    );
  }

  const discountPercent = product.original_price
    ? Math.round(
        ((product.original_price - product.price) / product.original_price) *
          100,
      )
    : 0;

  const handleQuantity = (type) => {
    if (type === "inc") {
      if (quantity < (product.stock || 10)) setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) setQuantity((prev) => prev - 1);
    }
  };

  const handleNextImage = () => {
    if (!product.images?.length) return;
    setActiveImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
  };

  const handlePrevImage = () => {
    if (!product.images?.length) return;
    setActiveImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  };

  const handleAskQuestion = (e) => {
    e.preventDefault();
    if (!questionInput.trim()) return;
    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: "কাস্টমার",
        question: questionInput,
        answer: "আমাদের সাপোর্ট টিম শীঘ্রই আপনার প্রশ্নের উত্তর দিবে।",
      },
    ]);
    setQuestionInput("");
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewInput.trim()) return;
    setReviews((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: "ইউজার",
        rating: reviewRating,
        comment: reviewInput,
        date: "আজকে",
      },
    ]);
    setReviewInput("");
  };

  const imagesList =
    product.images && product.images.length > 0
      ? product.images
      : [{ url: product.image || "" }];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pt-28 md:pt-32 pb-16 px-4 md:px-8 transition-colors duration-500">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* ⬅️ ব্যাক বাটন */}
        <Link
          to={-1}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-zinc-400 hover:text-[#C5A059] transition-colors mb-2 group"
        >
          <FaArrowLeft
            size={12}
            className="group-hover:-translate-x-1 transition-transform"
          />{" "}
          Back to Products
        </Link>

        {/* 📦 মেইন প্রোডাক্ট ডিসপ্লে গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-white dark:bg-zinc-900 rounded-3xl p-5 md:p-8 border border-slate-200/60 dark:border-zinc-800 shadow-sm">
          {/* 📸 এডভান্সড প্রোডাক্ট ইমেজ গ্যালারি ও স্লাইডার সেকশন */}
          <div className="w-full space-y-4">
            {/* মেইন প্রিভিউ ইমেজ */}
            <div
              className="w-full flex items-center justify-center bg-slate-100 dark:bg-zinc-800/40 rounded-2xl border border-slate-200/30 dark:border-zinc-800/50 overflow-hidden relative group aspect-square select-none"
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
            >
              {imagesList[activeImageIndex]?.url ? (
                <img
                  src={imagesList[activeImageIndex].url}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out cursor-pointer"
                  onClick={() => setIsZoomOpen(true)}
                />
              ) : (
                <span className="text-slate-400 text-sm">No Preview Image</span>
              )}

              {/* 🏷️ ডিসকাউন্ট ব্যাজ */}
              {discountPercent > 0 && (
                <span className="absolute top-4 left-4 bg-rose-500 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-lg tracking-wider shadow-md z-10">
                  Save {discountPercent}%
                </span>
              )}

              {/* 🔢 ইমেজ কাউন্টার ব্যাজ (যেমন: 1 / 4) */}
              {imagesList.length > 1 && (
                <span className="absolute top-4 right-4 bg-zinc-950/70 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 z-10">
                  {activeImageIndex + 1} / {imagesList.length}
                </span>
              )}

              {/* 🔍 জুম করার বাটন */}
              <button
                onClick={() => setIsZoomOpen(true)}
                className="absolute bottom-4 right-4 w-9 h-9 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-slate-800 dark:text-zinc-200 rounded-xl flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#C5A059] hover:text-white z-10"
                title="Zoom Image"
              >
                <FaExpand size={13} />
              </button>

              {/* ⬅️ ➡️ স্লাইডার নেভিগেশন বাটন */}
              {imagesList.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-slate-800 dark:text-zinc-200 rounded-xl flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#C5A059] hover:text-white z-10"
                  >
                    <FaChevronLeft size={12} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-slate-800 dark:text-zinc-200 rounded-xl flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#C5A059] hover:text-white z-10"
                  >
                    <FaChevronRight size={12} />
                  </button>
                </>
              )}
            </div>

            {/* 🖼️ থাম্বনেইল প্রিভিউ ট্র্যাক (Bottom Previews) */}
            {imagesList.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? "border-[#C5A059] scale-95 shadow-md ring-2 ring-[#C5A059]/30"
                        : "border-slate-200 dark:border-zinc-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.url || img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* বিবরণী ও অ্যাকশন এরিয়া */}
          <div className="flex flex-col justify-between py-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] bg-[#C5A059]/10 px-2.5 py-1 rounded-lg">
                  {product.category || "Casual"}
                </span>
                {product.rating && (
                  <div className="flex items-center gap-1.5 text-amber-500 bg-amber-500/5 dark:bg-amber-500/10 px-2.5 py-1 rounded-lg">
                    <FaStar size={12} className="fill-current" />
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                      {product.rating}
                    </span>
                  </div>
                )}
              </div>

              <h1 className="text-xl md:text-2xl font-black text-slate-950 dark:text-white leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-[#C5A059]">
                  {product.price} {product.currency || "BDT"}
                </span>
                {product.original_price && (
                  <span className="text-sm font-semibold line-through text-slate-400">
                    {product.original_price} {product.currency || "BDT"}
                  </span>
                )}
              </div>

              <hr className="border-slate-100 dark:border-zinc-800" />
              <p className="text-xs md:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                {product.description || "Premium urban fashion clothing item."}
              </p>

              {/* কালার ও সাইজ অপশন */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-zinc-400">
                    Select Color:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 ${
                          selectedColor === color
                            ? "bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-950 dark:border-zinc-100 shadow-md"
                            : "bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-800"
                        }`}
                      >
                        {selectedColor === color && <FaCheck size={8} />}{" "}
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-zinc-400">
                    Select Size:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 text-xs font-bold rounded-xl border flex items-center justify-center transition-all ${
                          selectedSize === size
                            ? "bg-[#C5A059] border-[#C5A059] text-zinc-950 shadow-md scale-105"
                            : "bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-800"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* কার্ট বাটন */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-zinc-800">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400">Availability:</span>
                <span
                  className={
                    (product.stock || 0) > 0
                      ? "text-emerald-500"
                      : "text-rose-500"
                  }
                >
                  {(product.stock || 0) > 0
                    ? `${product.stock} Units in Stock`
                    : "Out of Stock"}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl p-1 shrink-0">
                  <button
                    onClick={() => handleQuantity("dec")}
                    className="p-2 text-slate-500 dark:text-zinc-400 hover:text-[#C5A059] transition-colors"
                  >
                    <FaMinus size={10} />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-slate-800 dark:text-zinc-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantity("inc")}
                    className="p-2 text-slate-500 dark:text-zinc-400 hover:text-[#C5A059] transition-colors"
                  >
                    <FaPlus size={10} />
                  </button>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold rounded-xl shadow-md disabled:opacity-50 active:scale-95 transition-all"
                >
                  <FaShoppingBag size={12} /> Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 🔎 FULL-SCREEN ZOOM MODAL (LIGHTBOX) ================= */}
        {isZoomOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-6 right-6 text-white text-xl bg-zinc-800/80 p-3 rounded-full hover:bg-rose-600 transition-colors z-50"
            >
              <FaTimes />
            </button>
            <div className="relative max-w-4xl w-full max-h-[85vh] flex items-center justify-center">
              <img
                src={
                  imagesList[activeImageIndex]?.url ||
                  imagesList[activeImageIndex]
                }
                alt="Enlarged view"
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        )}

        {/* ================= 📊 TAB MATRIX: REVIEWS & QUESTIONS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ⭐ সেকশন এ: রেটিং ও কাস্টমার রিভিউ */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-slate-200/60 dark:border-zinc-800 shadow-sm space-y-4 text-left">
            <h3 className="font-black text-xs sm:text-sm uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-zinc-800 pb-3">
              <FaStar className="text-amber-500" /> Ratings & Reviews (
              {reviews.length})
            </h3>

            <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-2xl border border-slate-100 dark:border-zinc-800/60 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-950 dark:text-white">
                      {rev.user}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {rev.date}
                    </span>
                  </div>
                  <div className="flex text-amber-500 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={10}
                        className={
                          i < rev.rating
                            ? "fill-current"
                            : "text-slate-300 dark:text-zinc-700"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>

            {/* রিভিউ ইনপুট ফর্ম */}
            <form
              onSubmit={handleAddReview}
              className="space-y-2 pt-2 border-t border-slate-100 dark:border-zinc-800"
            >
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400">
                  Your Rating:
                </span>
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                  className="bg-slate-50 dark:bg-zinc-950 text-xs font-bold border border-slate-200 dark:border-zinc-800 rounded-lg p-1 focus:outline-none"
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n} Stars
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={reviewInput}
                  onChange={(e) => setReviewInput(e.target.value)}
                  placeholder="Write a product review..."
                  className="flex-1 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#C5A059]"
                />
                <button
                  type="submit"
                  className="px-4 bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-xl flex items-center justify-center active:scale-95 transition-all"
                >
                  <FaPaperPlane size={11} />
                </button>
              </div>
            </form>
          </div>

          {/* ❓ সেকশন বি: কাস্টমার প্রশ্ন ও উত্তর (Q&A) */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-slate-200/60 dark:border-zinc-800 shadow-sm space-y-4 text-left">
            <h3 className="font-black text-xs sm:text-sm uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-zinc-800 pb-3">
              <FaQuestionCircle className="text-[#C5A059]" /> Product Q&A Hub (
              {questions.length})
            </h3>

            <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-2xl border border-slate-100 dark:border-zinc-800/60 space-y-2"
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-black text-slate-950 dark:text-white flex items-center gap-1.5">
                      <span className="bg-blue-500 text-white text-[9px] px-1 rounded font-black">
                        Q
                      </span>{" "}
                      {q.question}
                    </p>
                    <span className="block text-[9px] text-slate-400 font-bold ml-5">
                      Asked by {q.user}
                    </span>
                  </div>
                  <div className="bg-white dark:bg-zinc-900 p-2 rounded-xl border border-slate-100 dark:border-zinc-800/40 text-xs text-slate-600 dark:text-zinc-300 ml-4 font-medium flex items-start gap-1.5">
                    <span className="bg-emerald-500 text-white text-[9px] px-1 rounded font-black mt-0.5">
                      A
                    </span>
                    <p>{q.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* প্রশ্ন ইনপুট ফর্ম */}
            <form
              onSubmit={handleAskQuestion}
              className="flex gap-2 pt-2 border-t border-slate-100 dark:border-zinc-800"
            >
              <input
                type="text"
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                placeholder="Ask a question about this item..."
                className="flex-1 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#C5A059]"
              />
              <button
                type="submit"
                className="px-4 bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-xl flex items-center justify-center active:scale-95 transition-all"
              >
                <FaCommentDots size={12} />
              </button>
            </form>
          </div>
        </div>

        {/* ================= 🛍️ PRODUCT SHOWCASE MATRIX GRID ================= */}

        {/* গ্রিড ১: একই ক্যাটাগরির সম্পর্কিত প্রোডাক্টস */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-zinc-800 pb-4">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Related Products Collection
              </h2>
              <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider">
                Same Category Matches
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-left">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                />
              ))}
            </div>
          </div>
        )}

        {/* গ্রিড ২: অন্য সব ক্যাটাগরির প্রোডাক্টস */}
        {otherCategoriesProducts.length > 0 && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-zinc-800 pb-4">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Explore Other Categories
              </h2>
              <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider">
                Discover More Trends
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {otherCategoriesProducts.map((product) => {
                const productId = product._id || product.id;
                const hasDiscount = product.original_price > product.price;
                const discountPercentage = hasDiscount
                  ? Math.round(
                      ((product.original_price - product.price) /
                        product.original_price) *
                        100,
                    )
                  : 0;

                const isFavorite = favorites?.some(
                  (item) => (item._id || item.id) === productId,
                );

                return (
                  <ProductCard
                    key={product._id || product.id}
                    product={product}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
