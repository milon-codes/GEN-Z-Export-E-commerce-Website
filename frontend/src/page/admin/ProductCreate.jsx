// import React, { useState } from "react";
// import {
//   Package,
//   Layers,
//   CircleDollarSign,
//   Palette,
//   Maximize,
//   UploadCloud,
//   FileText,
//   Trash2,
//   Eye,
//   Sparkles,
//   AlertCircle,
//   CheckCircle2,
//   X,
//   Loader2,
//   Star,
// } from "lucide-react";
// import { useAdmin } from "../../context/AdminContext"; // আপনার Context import

// const ProductCreate = () => {
//   const { createProduct } = useAdmin();

//   const [formData, setFormData] = useState({
//     title: "",
//     category: "",
//     price: "",
//     original_price: "",
//     stock: "",
//     description: "",
//     colors: "",
//     sizes: "",
//     isFeatured: false,
//   });

//   console.log(formData.stock, "stock");

//   // Multiple Images State
//   const [images, setImages] = useState([]);
//   const [previews, setPreviews] = useState([]);

//   // Status & View Controllers
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPreviewModal, setShowPreviewModal] = useState(false);
//   const [statusMessage, setStatusMessage] = useState({ type: null, text: "" });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Multiple Images Handling
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (!files.length) return;

//     let validFiles = [];
//     let validPreviews = [];

//     files.forEach((file) => {
//       if (file.sizes > 5 * 1024 * 1024) {
//         setStatusMessage({
//           type: "error",
//           text: `File ${file.name} is larger than 5MB limit!`,
//         });
//         return;
//       }
//       validFiles.push(file);
//       validPreviews.push(URL.createObjectURL(file));
//     });

//     setImages((prev) => [...prev, ...validFiles]);
//     setPreviews((prev) => [...prev, ...validPreviews]);

//     if (statusMessage.type === "error") {
//       setStatusMessage({ type: null, text: "" });
//     }
//   };

//   const handleRemoveImage = (index) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//     setPreviews((prev) => {
//       URL.revokeObjectURL(prev[index]);
//       return prev.filter((_, i) => i !== index);
//     });
//   };

//   const handleResetForm = () => {
//     setFormData({
//       title: "",
//       category: "",
//       price: "",
//       original_price: "",
//       stock: "",
//       description: "",
//       colors: "",
//       sizes: "",
//       isFeatured: false,
//     });
//     previews.forEach((url) => URL.revokeObjectURL(url));
//     setImages([]);
//     setPreviews([]);
//     setStatusMessage({ type: null, text: "" });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (images.length === 0) {
//       setStatusMessage({
//         type: "error",
//         text: "Please attach at least one product image!",
//       });
//       return;
//     }

//     setIsLoading(true);
//     setStatusMessage({ type: null, text: "" });

//     const dataToSend = new FormData();

//     Object.keys(formData).forEach((key) => {
//       if (key === "colors" || key === "sizes") {
//         const arrayData = formData[key]
//           .split(",")
//           .map((item) => item.trim())
//           .filter(Boolean);
//         // Backend array handling sync: "colors" key দিয়ে বারবার append করা
//         arrayData.forEach((item) => dataToSend.append(key, item));
//       } else {
//         dataToSend.append(key, formData[key]);
//       }
//     });

//     // Multiple images appends to dataToSend
//     images.forEach((imgFile) => {
//       dataToSend.append("images", imgFile);
//     });

//     try {
//       const result = await createProduct(dataToSend);

//       if (result?.success) {
//         setStatusMessage({
//           type: "success",
//           text: result?.message || "Product published successfully!",
//         });
//         handleResetForm();
//       } else {
//         setStatusMessage({
//           type: "error",
//           text:
//             result?.message || "Something went wrong while creating product.",
//         });
//       }
//     } catch (error) {
//       setStatusMessage({
//         type: "error",
//         text: error.message || "Failed to connect to backend service.",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Processing arrays for preview UI
//   const colorsArray = formData.colors
//     ? formData.colors
//         .split(",")
//         .map((c) => c.trim())
//         .filter(Boolean)
//     : [];
//   const sizesArray = formData.sizes
//     ? formData.sizes
//         .split(",")
//         .map((s) => s.trim())
//         .filter(Boolean)
//     : [];

//   return (
//     <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-500 antialiased font-sans select-none">
//       <div className="w-full max-w-5xl bg-white dark:bg-neutral-950 rounded-[2rem] shadow-[0_30px_70px_rgba(0,0,0,0.03)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.3)] overflow-hidden border border-neutral-200/60 dark:border-neutral-800/60 transition-all duration-500 backdrop-blur-sm">
//         {/* HEADER SEGMENT */}
//         <div className="relative bg-neutral-950 dark:bg-neutral-950 border-b border-neutral-800 p-6 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-[100px] pointer-events-none" />

//           <div className="relative z-10 text-left space-y-1">
//             <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 uppercase">
//               <Package className="w-5 h-5 sm:w-6 h-6 text-[#C5A059]" /> HQ Core:
//               Deploy Drop
//             </h2>
//             <p className="text-neutral-400 text-xs sm:text-sm font-medium max-w-xl">
//               Populate attributes and upload media assets to initialize database
//               synchronization.
//             </p>
//           </div>

//           <div className="relative z-10 flex items-center gap-2">
//             <button
//               type="button"
//               onClick={() => setShowPreviewModal(true)}
//               className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer"
//             >
//               <Eye size={14} className="text-[#C5A059]" /> Live Preview
//             </button>
//             <div className="inline-flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-3 py-2 rounded-xl text-[10px] text-[#C5A059] font-black uppercase tracking-wider">
//               <Sparkles
//                 size={12}
//                 className="animate-spin"
//                 style={{ animationDuration: "4s" }}
//               />{" "}
//               Matrix Ready
//             </div>
//           </div>
//         </div>

//         {/* SYSTEM NOTIFICATIONS */}
//         {statusMessage.type && (
//           <div
//             className={`mx-6 sm:mx-10 mt-6 p-4 rounded-2xl flex items-start gap-3 border transition-all duration-300 ${
//               statusMessage.type === "success"
//                 ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
//                 : "bg-red-500/5 border-red-500/20 text-red-600 dark:text-red-400"
//             }`}
//           >
//             {statusMessage.type === "success" ? (
//               <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
//             ) : (
//               <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
//             )}
//             <div className="text-xs sm:text-sm font-bold tracking-wide text-left">
//               {statusMessage.text}
//             </div>
//             <button
//               type="button"
//               onClick={() => setStatusMessage({ type: null, text: "" })}
//               className="ml-auto p-1 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
//             >
//               <X className="w-4 h-4 opacity-70" />
//             </button>
//           </div>
//         )}

//         {/* MAIN FORM */}
//         <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
//             {/* Title */}
//             <div className="text-left space-y-1.5">
//               <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
//                 <Package className="w-3.5 h-3.5 text-neutral-400" /> Drop Title{" "}
//                 <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="title"
//                 required
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 disabled={isLoading}
//                 placeholder="e.g. Cyber Premium Silk Panjabi"
//                 className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 disabled:opacity-50"
//               />
//             </div>

//             {/* Category Dropdown */}
//             <div className="text-left space-y-1.5">
//               <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
//                 <Layers className="w-3.5 h-3.5 text-neutral-400" /> Category
//                 Cluster <span className="text-red-500">*</span>
//               </label>
//               <select
//                 name="category"
//                 required
//                 value={formData.category}
//                 onChange={handleInputChange}
//                 disabled={isLoading}
//                 className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 cursor-pointer disabled:opacity-50"
//               >
//                 <option value="" className="text-neutral-400">
//                   Select Track Category
//                 </option>
//                 <option value="panjabi">Panjabi</option>
//                 <option value="shirt">Shirt</option>
//                 <option value="pant">Pant</option>
//                 <option value="t-shirt">T-Shirt</option>
//               </select>
//             </div>

//             {/* Price Input */}
//             <div className="text-left space-y-1.5">
//               <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
//                 <CircleDollarSign className="w-3.5 h-3.5 text-neutral-400" />{" "}
//                 Sale Price (৳) <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="number"
//                 name="price"
//                 required
//                 value={formData.price}
//                 onChange={handleInputChange}
//                 disabled={isLoading}
//                 placeholder="1850"
//                 min="0"
//                 className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 disabled:opacity-50"
//               />
//             </div>

//             {/* Original Price */}
//             <div className="text-left space-y-1.5">
//               <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
//                 <CircleDollarSign className="w-3.5 h-3.5 text-neutral-400" />{" "}
//                 Original Price (৳) <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="number"
//                 name="original_price"
//                 required
//                 value={formData.original_price}
//                 onChange={handleInputChange}
//                 disabled={isLoading}
//                 placeholder="2400"
//                 min="0"
//                 className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 disabled:opacity-50"
//               />
//             </div>

//             {/* Stock Count */}
//             <div className="text-left space-y-1.5">
//               <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
//                 <Layers className="w-3.5 h-3.5 text-neutral-400" /> Stock
//                 Quantity <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="number"
//                 name="stock"
//                 required
//                 value={formData.stock}
//                 onChange={handleInputChange}
//                 disabled={isLoading}
//                 placeholder="100"
//                 min="0"
//                 className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 disabled:opacity-50"
//               />
//             </div>

//             {/* Colors */}
//             <div className="text-left space-y-1">
//               <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
//                 <Palette className="w-3.5 h-3.5 text-neutral-400" /> Color Hues{" "}
//                 <span className="text-red-500">*</span>
//               </label>
//               <span className="text-[10px] text-neutral-400 font-medium block">
//                 Separate values with commas
//               </span>
//               <input
//                 type="text"
//                 name="colors"
//                 required
//                 value={formData.colors}
//                 onChange={handleInputChange}
//                 disabled={isLoading}
//                 placeholder="Black, Olive, Sand"
//                 className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 disabled:opacity-50"
//               />
//             </div>

//             {/* Size */}
//             <div className="text-left space-y-1">
//               <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
//                 <Maximize className="w-3.5 h-3.5 text-neutral-400" /> Available
//                 Sizes <span className="text-red-500">*</span>
//               </label>
//               <span className="text-[10px] text-neutral-400 font-medium block">
//                 Separate values with commas
//               </span>
//               <input
//                 type="text"
//                 name="sizes"
//                 required
//                 value={formData.sizes}
//                 onChange={handleInputChange}
//                 disabled={isLoading}
//                 placeholder="M, L, XL, XXL"
//                 className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 disabled:opacity-50"
//               />
//             </div>

//             {/*  */}
//             <div className="flex items-center gap-2 mt-4">
//               <input
//                 type="checkbox"
//                 id="isFeatured"
//                 name="isFeatured"
//                 checked={formData.isFeatured}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     isFeatured: e.target.checked,
//                   }))
//                 }
//                 className="w-4 h-4 accent-[#C5A059]"
//               />
//               <label
//                 htmlFor="isFeatured"
//                 className="text-xs font-bold text-white uppercase"
//               >
//                 Feature this product on Homepage
//               </label>
//             </div>

//             {/* MULTIPLE IMAGES UPLOAD AREA */}
//             <div className="md:col-span-2 text-left space-y-3">
//               <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center justify-between">
//                 <span>
//                   Integrated Media Gallery{" "}
//                   <span className="text-red-500">*</span>
//                 </span>
//                 <span className="text-[10px] text-neutral-400 font-normal">
//                   {images.length} File(s) Selected
//                 </span>
//               </label>

//               <div className="relative border-2 border-dashed border-neutral-300 dark:border-neutral-800 hover:border-[#C5A059] rounded-2xl p-6 transition-all duration-300 flex flex-col items-center justify-center min-h-[140px] bg-neutral-50/50 dark:bg-neutral-900/30 group">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={handleImageChange}
//                   disabled={isLoading}
//                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
//                 />
//                 <div className="p-3 bg-neutral-100 dark:bg-neutral-800/80 rounded-full mb-2 group-hover:scale-110 transition-transform">
//                   <UploadCloud className="w-6 h-6 text-[#C5A059]" />
//                 </div>
//                 <div className="text-center space-y-0.5">
//                   <p className="text-neutral-950 dark:text-white font-black text-xs uppercase tracking-wider">
//                     Mount New Media Files (Multiple)
//                   </p>
//                   <p className="text-neutral-400 text-[10px] font-medium">
//                     Supports PNG, JPG, WEBP (Max 5MB each)
//                   </p>
//                 </div>
//               </div>

//               {/* Previews */}
//               {previews.length > 0 && (
//                 <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
//                   {previews.map((src, idx) => (
//                     <div
//                       key={idx}
//                       className="relative group rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 aspect-square"
//                     >
//                       <img
//                         src={src}
//                         alt={`Preview ${idx + 1}`}
//                         className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                       />
//                       {idx === 0 && (
//                         <span className="absolute top-1.5 left-1.5 bg-[#C5A059] text-neutral-950 text-[8px] font-black uppercase px-1.5 py-0.5 rounded shadow">
//                           Main
//                         </span>
//                       )}
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveImage(idx)}
//                         disabled={isLoading}
//                         className="absolute top-1.5 right-1.5 p-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
//                       >
//                         <Trash2 size={12} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Description */}
//             <div className="md:col-span-2 text-left space-y-1.5">
//               <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
//                 <FileText className="w-3.5 h-3.5 text-neutral-400" /> Drop
//                 Specifications <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 name="description"
//                 required
//                 rows="4"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 disabled={isLoading}
//                 placeholder="Elaborate specs regarding material configurations, tailored fitting details..."
//                 className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-semibold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 resize-none disabled:opacity-50"
//               ></textarea>
//             </div>
//           </div>

//           {/* BUTTON CONTROLLER */}
//           <div className="pt-6 border-t border-neutral-100 dark:border-neutral-900 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
//             <button
//               type="button"
//               disabled={isLoading}
//               onClick={handleResetForm}
//               className="w-full sm:w-auto px-6 py-3.5 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-black uppercase tracking-wider text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-neutral-950 dark:hover:text-white transition-all duration-300 disabled:opacity-50 cursor-pointer"
//             >
//               Reset Terminal
//             </button>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full sm:w-auto bg-neutral-950 hover:bg-neutral-900 dark:bg-[#C5A059] dark:hover:bg-[#C5A059]/90 text-white dark:text-neutral-950 font-black text-xs uppercase tracking-wider py-3.5 px-8 rounded-xl shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="w-4 h-4 animate-spin" /> Syncing API...
//                 </>
//               ) : (
//                 "Publish Drop Asset"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* LIVE PRODUCT PREVIEW MODAL */}
//       {showPreviewModal && (
//         <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
//           <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl space-y-4 p-6 relative text-left">
//             <button
//               onClick={() => setShowPreviewModal(false)}
//               className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-neutral-100 dark:bg-neutral-900 rounded-full transition-colors cursor-pointer"
//             >
//               <X size={18} />
//             </button>

//             <div className="flex items-center gap-2 text-[#C5A059] text-xs font-black uppercase tracking-widest">
//               <Eye size={14} /> Product Card Preview
//             </div>

//             <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-4 space-y-4">
//               <div className="aspect-square rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 relative">
//                 {previews.length > 0 ? (
//                   <img
//                     src={previews[0]}
//                     alt="Main Drop"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs font-bold">
//                     No Image Uploaded
//                   </div>
//                 )}
//                 {formData.category && (
//                   <span className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border border-white/10">
//                     {formData.category}
//                   </span>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
//                     SKU: Draft
//                   </span>
//                   <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
//                     <Star size={12} className="fill-amber-500" />
//                     <span>5.0</span>
//                   </div>
//                 </div>

//                 {/* Fix: formData.title ব্যবহার করা হয়েছে */}
//                 <h3 className="text-lg font-black text-neutral-900 dark:text-white line-clamp-1">
//                   {formData.title || "Untitled Product"}
//                 </h3>

//                 <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">
//                   {formData.description ||
//                     "Product specs description placeholder..."}
//                 </p>

//                 {/* Colors & Sizes Chips */}
//                 <div className="space-y-2 pt-2">
//                   {colorsArray.length > 0 && (
//                     <div className="flex flex-wrap gap-1">
//                       {colorsArray.map((c, i) => (
//                         <span
//                           key={i}
//                           className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
//                         >
//                           {c}
//                         </span>
//                       ))}
//                     </div>
//                   )}

//                   {sizesArray.length > 0 && (
//                     <div className="flex flex-wrap gap-1">
//                       {sizesArray.map((s, i) => (
//                         <span
//                           key={i}
//                           className="text-[9px] font-bold px-2 py-0.5 rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200"
//                         >
//                           {s}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Pricing & Stock */}
//                 <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
//                   <div className="flex items-baseline gap-2">
//                     <span className="text-xl font-black text-[#C5A059]">
//                       ৳{formData.price || "0"}
//                     </span>
//                     {formData.original_price && (
//                       <span className="text-xs text-neutral-400 line-through">
//                         ৳{formData.original_price}
//                       </span>
//                     )}
//                   </div>
//                   <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">
//                     Stock: {formData.stock || "0"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductCreate;

/// 2

import React, { useState } from "react";
import {
  Package,
  Layers,
  CircleDollarSign,
  UploadCloud,
  FileText,
  Trash2,
  Eye,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  X,
  Loader2,
  Star,
  Check,
} from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

const AVAILABLE_SIZES = ["S", "M", "L", "XL", "XXL", "30", "32", "34", "36"];

const AVAILABLE_COLORS = [
  { name: "Red", class: "bg-red-500" },
  { name: "Black", class: "bg-black" },
  { name: "Blue", class: "bg-blue-500" },
  { name: "Green", class: "bg-emerald-500" },
  { name: "White", class: "bg-white border-gray-300" },
  { name: "Navy", class: "bg-indigo-900" },
  { name: "Yellow", class: "bg-amber-400" },
];

const ProductCreate = () => {
  const { createProduct } = useAdmin();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    original_price: "",
    stock: "",
    description: "",
    isFeatured: false,
  });

  // Size & Color States (Array format for cleaner state management)
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  // Multiple Images State
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  // Status & View Controllers
  const [isLoading, setIsLoading] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: null, text: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🏷️ Toggle Sizes
  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size],
    );
  };

  // 🎨 Toggle Colors
  const toggleColor = (colorName) => {
    const colorLower = colorName.toLowerCase();
    setSelectedColors((prev) =>
      prev.includes(colorLower)
        ? prev.filter((item) => item !== colorLower)
        : [...prev, colorLower],
    );
  };

  // 🖼️ Multiple Images Handling
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    let validFiles = [];
    let validPreviews = [];

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        setStatusMessage({
          type: "error",
          text: `File ${file.name} is larger than 5MB limit!`,
        });
        return;
      }
      validFiles.push(file);
      validPreviews.push(URL.createObjectURL(file));
    });

    setImages((prev) => [...prev, ...validFiles]);
    setPreviews((prev) => [...prev, ...validPreviews]);

    if (statusMessage.type === "error") {
      setStatusMessage({ type: null, text: "" });
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  // 🔄 Reset Form
  const handleResetForm = () => {
    setFormData({
      title: "",
      category: "",
      price: "",
      original_price: "",
      stock: "",
      description: "",
      isFeatured: false,
    });
    setSelectedSizes([]);
    setSelectedColors([]);
    previews.forEach((url) => URL.revokeObjectURL(url));
    setImages([]);
    setPreviews([]);
    setStatusMessage({ type: null, text: "" });
  };

  // 🚀 Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      setStatusMessage({
        type: "error",
        text: "Please attach at least one product image!",
      });
      return;
    }

    setIsLoading(true);
    setStatusMessage({ type: null, text: "" });

    const dataToSend = new FormData();

    // Key-value pair append
    Object.keys(formData).forEach((key) => {
      dataToSend.append(key, formData[key]);
    });

    // Append array sizes
    selectedSizes.forEach((size) => {
      dataToSend.append("sizes", size);
    });

    // Append array colors
    selectedColors.forEach((color) => {
      dataToSend.append("colors", color);
    });

    // Multiple images appends
    images.forEach((imgFile) => {
      dataToSend.append("images", imgFile);
    });

    try {
      const result = await createProduct(dataToSend);

      if (result?.success) {
        setStatusMessage({
          type: "success",
          text: result?.message || "Product published successfully!",
        });
        handleResetForm();
      } else {
        setStatusMessage({
          type: "error",
          text:
            result?.message || "Something went wrong while creating product.",
        });
      }
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: error.message || "Failed to connect to backend service.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-500 antialiased font-sans select-none">
      <div className="w-full max-w-5xl bg-white dark:bg-neutral-950 rounded-[2rem] shadow-[0_30px_70px_rgba(0,0,0,0.03)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.3)] overflow-hidden border border-neutral-200/60 dark:border-neutral-800/60 transition-all duration-500 backdrop-blur-sm">
        {/* HEADER SEGMENT */}
        <div className="relative bg-neutral-950 dark:bg-neutral-950 border-b border-neutral-800 p-6 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 text-left space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 uppercase">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-[#C5A059]" /> HQ
              Core: Deploy Drop
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm font-medium max-w-xl">
              Populate attributes and upload media assets to initialize database
              synchronization.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPreviewModal(true)}
              className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <Eye size={14} className="text-[#C5A059]" /> Live Preview
            </button>
            <div className="inline-flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-3 py-2 rounded-xl text-[10px] text-[#C5A059] font-black uppercase tracking-wider">
              <Sparkles
                size={12}
                className="animate-spin"
                style={{ animationDuration: "4s" }}
              />{" "}
              Matrix Ready
            </div>
          </div>
        </div>

        {/* SYSTEM NOTIFICATIONS */}
        {statusMessage.type && (
          <div
            className={`mx-6 sm:mx-10 mt-6 p-4 rounded-2xl flex items-start gap-3 border transition-all duration-300 ${
              statusMessage.type === "success"
                ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                : "bg-red-500/5 border-red-500/20 text-red-600 dark:text-red-400"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            )}
            <div className="text-xs sm:text-sm font-bold tracking-wide text-left">
              {statusMessage.text}
            </div>
            <button
              type="button"
              onClick={() => setStatusMessage({ type: null, text: "" })}
              className="ml-auto p-1 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 opacity-70" />
            </button>
          </div>
        )}

        {/* MAIN FORM */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {/* Title */}
            <div className="text-left space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-neutral-400" /> Drop Title{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="e.g. Cyber Premium Silk Panjabi"
                className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 disabled:opacity-50"
              />
            </div>

            {/* Category Dropdown */}
            <div className="text-left space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-neutral-400" /> Category
                Cluster <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 cursor-pointer disabled:opacity-50"
              >
                <option value="" className="text-neutral-400">
                  Select Track Category
                </option>
                <option value="panjabi">Panjabi</option>
                <option value="shirt">Shirt</option>
                <option value="pant">Pant</option>
                <option value="t-shirt">T-Shirt</option>
              </select>
            </div>

            {/* Price Input */}
            <div className="text-left space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <CircleDollarSign className="w-3.5 h-3.5 text-neutral-400" />{" "}
                Sale Price (৳) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="1850"
                min="0"
                className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 disabled:opacity-50"
              />
            </div>

            {/* Original Price */}
            <div className="text-left space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <CircleDollarSign className="w-3.5 h-3.5 text-neutral-400" />{" "}
                Original Price (৳) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="original_price"
                required
                value={formData.original_price}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="2400"
                min="0"
                className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 disabled:opacity-50"
              />
            </div>

            {/* Stock Count */}
            <div className="text-left space-y-1.5 md:col-span-2">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-neutral-400" /> Stock
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                required
                value={formData.stock}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="100"
                min="0"
                className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 disabled:opacity-50"
              />
            </div>

            {/* Sizes */}
            <div className="text-left space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Available Sizes
              </label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_SIZES.map((size) => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      disabled={isLoading}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#C5A059] text-neutral-950 border-[#C5A059] shadow-md shadow-[#C5A059]/20 scale-105"
                          : "bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-[#C5A059]/50"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colors */}
            <div className="text-left space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Available Colors
              </label>
              <div className="flex flex-wrap gap-2.5">
                {AVAILABLE_COLORS.map((color) => {
                  const isSelected = selectedColors.includes(
                    color.name.toLowerCase(),
                  );
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => toggleColor(color.name)}
                      disabled={isLoading}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#C5A059] bg-[#C5A059]/10 text-[#C5A059] scale-105"
                          : "border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:border-[#C5A059]/50"
                      }`}
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded-full border border-black/10 shadow-sm ${color.class}`}
                      />
                      {color.name}
                      {isSelected && (
                        <Check size={12} className="text-[#C5A059]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Featured Checkbox */}
            <div className="md:col-span-2 flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isFeatured: e.target.checked,
                  }))
                }
                disabled={isLoading}
                className="w-4 h-4 accent-[#C5A059] cursor-pointer"
              />
              <label
                htmlFor="isFeatured"
                className="text-xs font-bold text-neutral-800 dark:text-white uppercase cursor-pointer"
              >
                Feature this product on Homepage
              </label>
            </div>

            {/* MULTIPLE IMAGES UPLOAD AREA */}
            <div className="md:col-span-2 text-left space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center justify-between">
                <span>
                  Integrated Media Gallery{" "}
                  <span className="text-red-500">*</span>
                </span>
                <span className="text-[10px] text-neutral-400 font-normal">
                  {images.length} File(s) Selected
                </span>
              </label>

              <div className="relative border-2 border-dashed border-neutral-300 dark:border-neutral-800 hover:border-[#C5A059] rounded-2xl p-6 transition-all duration-300 flex flex-col items-center justify-center min-h-[140px] bg-neutral-50/50 dark:bg-neutral-900/30 group">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  disabled={isLoading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                />
                <div className="p-3 bg-neutral-100 dark:bg-neutral-800/80 rounded-full mb-2 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6 text-[#C5A059]" />
                </div>
                <div className="text-center space-y-0.5">
                  <p className="text-neutral-950 dark:text-white font-black text-xs uppercase tracking-wider">
                    Mount New Media Files (Multiple)
                  </p>
                  <p className="text-neutral-400 text-[10px] font-medium">
                    Supports PNG, JPG, WEBP (Max 5MB each)
                  </p>
                </div>
              </div>

              {/* Previews */}
              {previews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
                  {previews.map((src, idx) => (
                    <div
                      key={idx}
                      className="relative group rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 aspect-square"
                    >
                      <img
                        src={src}
                        alt={`Preview ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {idx === 0 && (
                        <span className="absolute top-1.5 left-1.5 bg-[#C5A059] text-neutral-950 text-[8px] font-black uppercase px-1.5 py-0.5 rounded shadow">
                          Main
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        disabled={isLoading}
                        className="absolute top-1.5 right-1.5 p-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2 text-left space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-neutral-400" /> Drop
                Specifications <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="Elaborate specs regarding material configurations, tailored fitting details..."
                className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-semibold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 resize-none disabled:opacity-50"
              ></textarea>
            </div>
          </div>

          {/* BUTTON CONTROLLER */}
          <div className="pt-6 border-t border-neutral-100 dark:border-neutral-900 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <button
              type="button"
              disabled={isLoading}
              onClick={handleResetForm}
              className="w-full sm:w-auto px-6 py-3.5 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-black uppercase tracking-wider text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-neutral-950 dark:hover:text-white transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              Reset Terminal
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto bg-neutral-950 hover:bg-neutral-900 dark:bg-[#C5A059] dark:hover:bg-[#C5A059]/90 text-white dark:text-neutral-950 font-black text-xs uppercase tracking-wider py-3.5 px-8 rounded-xl shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Syncing API...
                </>
              ) : (
                "Publish Drop Asset"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* LIVE PRODUCT PREVIEW MODAL */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl space-y-4 p-6 relative text-left">
            <button
              onClick={() => setShowPreviewModal(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-neutral-100 dark:bg-neutral-900 rounded-full transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 text-[#C5A059] text-xs font-black uppercase tracking-widest">
              <Eye size={14} /> Product Card Preview
            </div>

            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-4 space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 relative">
                {previews.length > 0 ? (
                  <img
                    src={previews[0]}
                    alt="Main Drop"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs font-bold">
                    No Image Uploaded
                  </div>
                )}
                {formData.category && (
                  <span className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border border-white/10">
                    {formData.category}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                    SKU: Draft
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star size={12} className="fill-amber-500" />
                    <span>5.0</span>
                  </div>
                </div>

                <h3 className="text-lg font-black text-neutral-900 dark:text-white line-clamp-1">
                  {formData.title || "Untitled Product"}
                </h3>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">
                  {formData.description ||
                    "Product specs description placeholder..."}
                </p>

                {/* Colors & Sizes Chips Preview */}
                <div className="space-y-2 pt-2">
                  {selectedColors.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {selectedColors.map((c, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 capitalize"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}

                  {selectedSizes.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {selectedSizes.map((s, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-bold px-2 py-0.5 rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pricing & Stock */}
                <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-[#C5A059]">
                      ৳{formData.price || "0"}
                    </span>
                    {formData.original_price && (
                      <span className="text-xs text-neutral-400 line-through">
                        ৳{formData.original_price}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">
                    Stock: {formData.stock || "0"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCreate;
