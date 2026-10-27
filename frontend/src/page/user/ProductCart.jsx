import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiShoppingCart } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useProducts } from "../../context/ProductContext"; // আপনার সঠিক Context Path দিন

const ProductCard = ({ product }) => {
  const {
    cart = [],
    addToCart,
    favorites = [],
    addToFavorites,
    removeFromFavorites,
  } = useProducts();

  if (!product) return null;

  // 🆔 ID Fallback (MongoDB `_id` নাকি সাধারণ `id`)
  const productId = product._id;

  // 💰 Price & Discount Calculation
  const price = Number(product.price) || 0;
  const originalPrice = Number(product.original_price) || 0;
  const hasDiscount = originalPrice > price;
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  // ❤️ Favorite Check
  const isFavorite = favorites?.some((item) => item._id === productId);

  // 🛒 Cart Check (যদি দরকার হয়)
  const isInCart = cart?.some((item) => item._id === productId);

  return (
    <div className="group bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-3xl p-3.5 space-y-4 hover:border-[#C5A059]/40 dark:hover:border-[#C5A059]/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-500 relative flex flex-col justify-between">
      <div>
        {/* 🖼️ Product Image Area */}
        <div className="relative aspect-[4/5] bg-neutral-100 dark:bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-200/30 dark:border-neutral-800/30">
          {/* Discount Badge */}
          {hasDiscount && (
            <span className="absolute top-3 left-3 z-10 px-2 py-1 bg-rose-500 text-white font-black text-[9px] tracking-widest uppercase rounded-lg shadow-sm">
              -{discountPercentage}% DROP
            </span>
          )}

          {/* Stock Badge */}
          {product.stock <= 0 && (
            <span className="absolute inset-0 z-10 bg-neutral-950/60 backdrop-blur-[2px] text-white font-black text-xs tracking-widest uppercase flex items-center justify-center">
              OUT OF STOCK
            </span>
          )}

          {/* Single Standard Details Link */}
          <Link to={`/shop/category/${product.category}/${product.slug}`}>
            <img
              src={product.images[0].url}
              alt={product.name}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </Link>

          {/* 🎛️ Action Overlay Controls */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
            {/* Quick View */}
            <Link
              to={`/shop/category/${product.category}/${product.slug}`}
              className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-md border border-neutral-200/40 dark:border-neutral-800/60 flex items-center justify-center hover:text-[#C5A059] transition-colors"
              title="Quick View"
            >
              <FiEye size={15} />
            </Link>

            {/* Favorite Button */}
            <button
              onClick={() =>
                isFavorite
                  ? removeFromFavorites(productId)
                  : addToFavorites(product)
              }
              className={`w-10 h-10 rounded-xl shadow-md flex items-center justify-center active:scale-95 transition-all cursor-pointer border ${
                isFavorite
                  ? "bg-neutral-950 text-[#e4024d] border-neutral-950 hover:bg-neutral-900"
                  : "bg-[#C5A059] text-neutral-950 border-[#C5A059] hover:bg-[#C5A059]/90"
              }`}
              title="Wishlist"
            >
              {isFavorite ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
            </button>

            {/* Add To Cart */}
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock <= 0}
              className={`w-10 h-10 rounded-xl shadow-md flex items-center justify-center active:scale-95 transition-all cursor-pointer border ${
                isInCart
                  ? "bg-neutral-950 text-[#1cf808] border-neutral-950 hover:bg-neutral-900"
                  : "bg-[#C5A059] text-neutral-950 border-[#C5A059] hover:bg-[#C5A059]/90"
              }`}
              title="Wishlist"
            >
              {isInCart ? (
                <FiShoppingCart size={16} />
              ) : (
                <FiShoppingCart size={16} />
              )}
            </button>
            {/* <button
              onClick={() => addToCart(product)}
              disabled={product.stock <= 0}
              className="w-10 h-10 rounded-xl bg-[#C5A059] text-neutral-950 shadow-md flex items-center justify-center hover:bg-[#C5A059]/90 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all cursor-pointer"
              title="Add to Cart"
            >
              <FiShoppingCart size={15} />
            </button> */}
          </div>
        </div>

        {/* 📝 Details Metadata */}
        <div className="space-y-1.5 px-1 mt-3">
          <div className="flex items-center justify-between text-[10px] font-black tracking-widest text-[#C5A059] uppercase">
            <span>{product.category || "FRESH DROP"}</span>
            <span className="text-neutral-400 dark:text-neutral-500 font-bold">
              ⭐ {product.rating || "4.5"}
            </span>
          </div>

          <Link to={`/shop/${productId}`}>
            <h3 className="font-black uppercase text-xs sm:text-sm tracking-tight text-neutral-900 dark:text-white line-clamp-1 group-hover:text-[#C5A059] transition-colors duration-300">
              {product.name}
            </h3>
          </Link>

          <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-medium line-clamp-1">
            {product.description || "Premium street culture wear compilation."}
          </p>
        </div>
      </div>

      {/* 🏷️ Pricing Bottom Section */}
      <div className="pt-2 mt-2 border-t border-neutral-100 dark:border-neutral-800/60 flex items-baseline justify-between px-1">
        <div className="flex items-baseline gap-2">
          <span className="font-black text-sm sm:text-base text-neutral-900 dark:text-white">
            {price} {product.currency || "BDT"}
          </span>
          {hasDiscount && (
            <span className="font-bold text-xs text-neutral-400 dark:text-neutral-500 line-through">
              {originalPrice}
            </span>
          )}
        </div>

        <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase">
          Stock: {product.stock ?? 0}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;

// 2

// import React from "react";
// import { Link } from "react-router-dom";
// import { FiEye, FiShoppingCart } from "react-icons/fi";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import { useProducts } from "../../context/ProductContext";

// const ProductCard = ({ product }) => {
//   const {
//     cart = [],
//     addToCart,
//     favorites = [],
//     addToFavorites,
//     removeFromFavorites,
//   } = useProducts();

//   if (!product) return null;

//   console.log(product, "products");

//   // 🆔 ID Handling (MongoDB `_id` নাকি স্ট্যান্ডার্ড `id`)
//   const productId = product._id || product.id;

//   // 🖼️ First Image Selection (অ্যারে থেকে প্রথম ছবি অথবা সিঙ্গেল ইমেজ Fallback)
//   const displayImage =
//     Array.isArray(product.image) && product.image.length > 0
//       ? product.image[0].url
//       : product.image || "/placeholder.jpg";

//   // 💰 Price & Discount Calculation
//   const price = Number(product.price) || 0;
//   const originalPrice = Number(product.original_price) || 0;
//   const hasDiscount = originalPrice > price;
//   const discountPercentage = hasDiscount
//     ? Math.round(((originalPrice - price) / originalPrice) * 100)
//     : 0;

//   // ❤️ Favorite Check
//   const isFavorite = favorites?.some(
//     (item) => (item._id || item.id) === productId,
//   );

//   // 🛒 Cart Check
//   const isInCart = cart?.some((item) => (item._id || item.id) === productId);

//   // Product Dynamic Route Link
//   const productDetailLink = `/shop/category/${product.category || "all"}/${productId}`;

//   return (
//     <div className="group bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-3xl p-3.5 space-y-4 hover:border-[#C5A059]/40 dark:hover:border-[#C5A059]/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-500 relative flex flex-col justify-between">
//       <div>
//         {/* 🖼️ Product Image Area */}
//         <div className="relative aspect-[4/5] bg-neutral-100 dark:bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-200/30 dark:border-neutral-800/30">
//           {/* Discount Badge */}
//           {hasDiscount && (
//             <span className="absolute top-3 left-3 z-10 px-2 py-1 bg-rose-500 text-white font-black text-[9px] tracking-widest uppercase rounded-lg shadow-sm">
//               -{discountPercentage}% DROP
//             </span>
//           )}

//           {/* Stock Badge */}
//           {product.stock <= 0 && (
//             <span className="absolute inset-0 z-10 bg-neutral-950/60 backdrop-blur-[2px] text-white font-black text-xs tracking-widest uppercase flex items-center justify-center">
//               OUT OF STOCK
//             </span>
//           )}

//           {/* Display Primary Image */}
//           <Link to={productDetailLink}>
//             <img
//               src={product?.image[0]?.url}
//               alt={product.name || "Product Image"}
//               className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
//             />
//           </Link>

//           {/* 🎛️ Action Overlay Controls */}
//           <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
//             {/* Quick View */}
//             <Link
//               to={productDetailLink}
//               className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-md border border-neutral-200/40 dark:border-neutral-800/60 flex items-center justify-center hover:text-[#C5A059] transition-colors"
//               title="Quick View"
//             >
//               <FiEye size={15} />
//             </Link>

//             {/* Favorite Button */}
//             <button
//               onClick={() =>
//                 isFavorite
//                   ? removeFromFavorites(productId)
//                   : addToFavorites(product)
//               }
//               className={`w-10 h-10 rounded-xl shadow-md flex items-center justify-center active:scale-95 transition-all cursor-pointer border ${
//                 isFavorite
//                   ? "bg-neutral-950 text-[#e4024d] border-neutral-950 hover:bg-neutral-900"
//                   : "bg-[#C5A059] text-neutral-950 border-[#C5A059] hover:bg-[#C5A059]/90"
//               }`}
//               title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
//             >
//               {isFavorite ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
//             </button>

//             {/* Add To Cart Button */}
//             <button
//               onClick={() => addToCart(product)}
//               disabled={product.stock <= 0}
//               className={`w-10 h-10 rounded-xl shadow-md flex items-center justify-center active:scale-95 transition-all cursor-pointer border disabled:opacity-50 disabled:cursor-not-allowed ${
//                 isInCart
//                   ? "bg-neutral-950 text-[#1cf808] border-neutral-950 hover:bg-neutral-900"
//                   : "bg-[#C5A059] text-neutral-950 border-[#C5A059] hover:bg-[#C5A059]/90"
//               }`}
//               title={isInCart ? "In Cart" : "Add to Cart"}
//             >
//               <FiShoppingCart size={16} />
//             </button>
//           </div>
//         </div>

//         {/* 📝 Details Metadata */}
//         <div className="space-y-1.5 px-1 mt-3">
//           <div className="flex items-center justify-between text-[10px] font-black tracking-widest text-[#C5A059] uppercase">
//             <span>{product.category || "FRESH DROP"}</span>
//             <span className="text-neutral-400 dark:text-neutral-500 font-bold">
//               ⭐ {product.rating || "4.5"}
//             </span>
//           </div>

//           <Link to={productDetailLink}>
//             <h3 className="font-black uppercase text-xs sm:text-sm tracking-tight text-neutral-900 dark:text-white line-clamp-1 group-hover:text-[#C5A059] transition-colors duration-300">
//               {product.name}
//             </h3>
//           </Link>

//           <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-medium line-clamp-1">
//             {product.description || "Premium street culture wear compilation."}
//           </p>
//         </div>
//       </div>

//       {/* 🏷️ Pricing Bottom Section */}
//       <div className="pt-2 mt-2 border-t border-neutral-100 dark:border-neutral-800/60 flex items-baseline justify-between px-1">
//         <div className="flex items-baseline gap-2">
//           <span className="font-black text-sm sm:text-base text-neutral-900 dark:text-white">
//             {price} {product.currency || "BDT"}
//           </span>
//           {hasDiscount && (
//             <span className="font-bold text-xs text-neutral-400 dark:text-neutral-500 line-through">
//               {originalPrice}
//             </span>
//           )}
//         </div>

//         <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase">
//           Stock: {product.stock ?? 0}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
