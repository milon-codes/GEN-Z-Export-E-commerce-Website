// import React, { useState, useEffect } from "react";
// import {
//   X,
//   Upload,
//   Trash2,
//   Loader2,
//   Package,
//   DollarSign,
//   Tag,
//   Layers,
//   FileText,
//   CheckCircle2,
// } from "lucide-react";
// import { useAdmin } from "../../context/AdminContext";

// const AVAILABLE_SIZES = ["S", "M", "L", "XL", "XXL", "3XL"];
// const AVAILABLE_COLORS = [
//   { name: "Red", class: "bg-red-500" },
//   { name: "Black", class: "bg-black" },
//   { name: "Blue", class: "bg-blue-500" },
//   { name: "Green", class: "bg-emerald-500" },
//   { name: "White", class: "bg-white border-gray-300" },
//   { name: "Navy", class: "bg-indigo-900" },
//   { name: "Yellow", class: "bg-amber-400" },
// ];

// const UpdateProduct = ({ product, isOpen, onClose, onUpdateSuccess }) => {
//   const { updateProduct } = useAdmin();

//   const [formData, setFormData] = useState({
//     title: "",
//     category: "",
//     price: "",
//     original_price: "",
//     stock: "",
//     description: "",
//     isFeatured: false,
//   });

//   const [selectedSizes, setSelectedSizes] = useState([]);
//   const [selectedColors, setSelectedColors] = useState([]);

//   // Existing images from Cloudinary
//   const [existingImages, setExistingImages] = useState([]);
//   // New image files selected by user
//   const [newImageFiles, setNewImageFiles] = useState([]);
//   const [newImagePreviews, setNewImagePreviews] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   // Populate form data when product prop changes
//   useEffect(() => {
//     if (product) {
//       setFormData({
//         title: product.title || "",
//         category: product.category || "",
//         price: product.price || "",
//         original_price: product.original_price || "",
//         stock: product.stock ?? 0,
//         description: product.description || "",
//         isFeatured: product.isFeatured || false,
//       });

//       // Sizes formatting
//       if (Array.isArray(product.sizes)) {
//         setSelectedSizes(product.sizes.map((s) => s.toUpperCase()));
//       }

//       // Colors formatting
//       if (Array.isArray(product.colors)) {
//         setSelectedColors(product.colors.map((c) => c.toLowerCase()));
//       }

//       // Images setup
//       setExistingImages(product.images || []);
//       setNewImageFiles([]);
//       setNewImagePreviews([]);
//       setErrorMsg("");
//       setSuccessMsg("");
//     }
//   }, [product, isOpen]);

//   if (!isOpen) return null;

//   // Handle text/number inputs
//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : (value ?? ""),
//     }));
//   };

//   // Toggle Sizes Selection
//   const toggleSize = (size) => {
//     setSelectedSizes((prev) =>
//       prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
//     );
//   };

//   // Toggle Colors Selection
//   const toggleColor = (colorName) => {
//     const lower = colorName.toLowerCase();
//     setSelectedColors((prev) =>
//       prev.includes(lower) ? prev.filter((c) => c !== lower) : [...prev, lower],
//     );
//   };

//   // Handle New File Selection
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (!files.length) return;

//     setNewImageFiles((prev) => [...prev, ...files]);

//     const newPreviews = files.map((file) => URL.createObjectURL(file));
//     setNewImagePreviews((prev) => [...prev, ...newPreviews]);
//   };

//   // Remove Existing Cloudinary Image
//   const handleRemoveExistingImage = (indexToRemove) => {
//     setExistingImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
//   };

//   // Remove New Upload Preview
//   const handleRemoveNewImage = (indexToRemove) => {
//     setNewImageFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
//     setNewImagePreviews((prev) =>
//       prev.filter((_, idx) => idx !== indexToRemove),
//     );
//   };

//   // Form Submit Handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMsg("");
//     setSuccessMsg("");

//     // Custom Price Logic Check
//     if (Number(formData.original_price) < Number(formData.price)) {
//       setErrorMsg(
//         "Original price must be greater than or equal to current price!",
//       );
//       setLoading(false);
//       return;
//     }

//     if (existingImages.length === 0 && newImageFiles.length === 0) {
//       setErrorMsg("Please keep at least one image for the product.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const data = new FormData();
//       data.append("title", formData.title);
//       data.append("category", formData.category);
//       data.append("price", formData.price);
//       data.append("original_price", formData.original_price);
//       data.append("stock", formData.stock);
//       data.append("description", formData.description);
//       data.append("isFeatured", formData.isFeatured);

//       // Sizes & Colors Array
//       data.append("sizes", selectedSizes.join(","));
//       data.append("colors", selectedColors.join(","));

//       // Send remaining existing images JSON
//       data.append("existingImages", JSON.stringify(existingImages));

//       // Append new image files
//       newImageFiles.forEach((file) => {
//         data.append("images", file);
//       });

//       // API Call
//       const result = await updateProduct(product._id, data);
//       console.log(result, "result update");

//       if (result.success) {
//         setSuccessMsg("Product updated successfully!");
//         setTimeout(() => {
//           if (onUpdateSuccess)
//             onUpdateSuccess(result.payload?.product || result.product);
//           onClose();
//         }, 1200);
//       } else {
//         setErrorMsg(result.message || "Failed to update product.");
//       }
//     } catch (error) {
//       console.error("Update error:", error);
//       setErrorMsg("Something went wrong while updating product.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
//       <div className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden my-8 border border-slate-200 dark:border-slate-800 transition-all">
//         {/* Modal Header */}
//         <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
//           <div className="flex items-center gap-3">
//             <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-xl">
//               <Package className="w-5 h-5" />
//             </div>
//             <div>
//               <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
//                 Edit Product
//               </h2>
//               <p className="text-xs text-slate-500 dark:text-slate-400">
//                 Update product information, pricing, stock & images
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 rounded-full transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Modal Body / Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="p-6 space-y-6 max-h-[80vh] overflow-y-auto"
//         >
//           {/* Error & Success Alert */}
//           {errorMsg && (
//             <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm rounded-xl flex items-center gap-2">
//               <X className="w-4 h-4 shrink-0" />
//               <span>{errorMsg}</span>
//             </div>
//           )}
//           {successMsg && (
//             <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 text-sm rounded-xl flex items-center gap-2">
//               <CheckCircle2 className="w-4 h-4 shrink-0" />
//               <span>{successMsg}</span>
//             </div>
//           )}

//           {/* Section 1: Basic Details */}
//           <div className="space-y-4">
//             <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
//               <Tag className="w-4 h-4" /> Basic Details
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Title */}
//               <div>
//                 <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
//                   Product Title *
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   required
//                   value={formData.title || ""}
//                   onChange={handleInputChange}
//                   placeholder="e.g. Premium Silk Panjabi"
//                   className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
//                 />
//               </div>

//               {/* Category */}
//               <div>
//                 <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
//                   Category *
//                 </label>
//                 <select
//                   name="category"
//                   required
//                   value={formData.category || ""}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all capitalize"
//                 >
//                   <option value="">Select Category</option>
//                   <option value="panjabi">Panjabi</option>
//                   <option value="shirt">Shirt</option>
//                   <option value="t-shirt">T-Shirt</option>
//                   <option value="hoodie">Hoodie</option>
//                   <option value="saree">Saree</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Section 2: Pricing & Inventory */}
//           <div className="space-y-4">
//             <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
//               <DollarSign className="w-4 h-4" /> Pricing & Stock
//             </h3>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//               {/* Price */}
//               <div>
//                 <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
//                   Selling Price (BDT) *
//                 </label>
//                 <input
//                   type="number"
//                   name="price"
//                   required
//                   min="0"
//                   value={formData.price || ""}
//                   onChange={handleInputChange}
//                   placeholder="1200"
//                   className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
//                 />
//               </div>

//               {/* Original Price */}
//               <div>
//                 <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
//                   Original Price (Regular) *
//                 </label>
//                 <input
//                   type="number"
//                   name="original_price"
//                   required
//                   min="0"
//                   value={formData.original_price || ""}
//                   onChange={handleInputChange}
//                   placeholder="1600"
//                   className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
//                 />
//               </div>

//               {/* Stock */}
//               <div>
//                 <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
//                   Stock Quantity *
//                 </label>
//                 <input
//                   type="number"
//                   name="stock"
//                   required
//                   min="0"
//                   value={formData.stock || ""}
//                   onChange={handleInputChange}
//                   placeholder="50"
//                   className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Section 3: Variants (Sizes & Colors) */}
//           <div className="space-y-4">
//             <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
//               <Layers className="w-4 h-4" /> Variants (Sizes & Colors)
//             </h3>

//             {/* Sizes */}
//             <div>
//               <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
//                 Available Sizes
//               </label>
//               <div className="flex flex-wrap gap-2">
//                 {AVAILABLE_SIZES.map((size) => {
//                   const isSelected = selectedSizes.includes(size);
//                   return (
//                     <button
//                       key={size}
//                       type="button"
//                       onClick={() => toggleSize(size)}
//                       className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
//                         isSelected
//                           ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20"
//                           : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-transparent hover:border-slate-300"
//                       }`}
//                     >
//                       {size}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Colors */}
//             <div>
//               <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
//                 Available Colors
//               </label>
//               <div className="flex flex-wrap gap-3">
//                 {AVAILABLE_COLORS.map((color) => {
//                   const isSelected = selectedColors.includes(
//                     color.name.toLowerCase(),
//                   );
//                   return (
//                     <button
//                       key={color.name}
//                       type="button"
//                       onClick={() => toggleColor(color.name)}
//                       className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
//                         isSelected
//                           ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400"
//                           : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
//                       }`}
//                     >
//                       <span
//                         className={`w-3.5 h-3.5 rounded-full border shadow-sm ${color.class}`}
//                       />
//                       {color.name}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Section 4: Images */}
//           <div className="space-y-4">
//             <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
//               <Upload className="w-4 h-4" /> Product Images
//             </h3>

//             {/* Upload Box */}
//             <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-2xl cursor-pointer bg-slate-50/50 dark:bg-slate-900/50 transition-all group">
//               <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-500 transition-colors mb-2" />
//               <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
//                 Click to upload new images
//               </span>
//               <span className="text-[10px] text-slate-400 mt-1">
//                 PNG, JPG, WEBP up to 5MB each
//               </span>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//             </label>

//             {/* Images Preview Grid */}
//             <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
//               {/* Existing Images */}
//               {existingImages.map((img, idx) => (
//                 <div
//                   key={img.public_id || idx}
//                   className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 aspect-square"
//                 >
//                   <img
//                     src={img.url}
//                     alt="Product"
//                     className="w-full h-full object-cover"
//                   />
//                   <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/60 text-white text-[9px] rounded font-mono">
//                     Saved
//                   </span>
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveExistingImage(idx)}
//                     className="absolute top-1 right-1 p-1 bg-red-600/80 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
//                   >
//                     <Trash2 className="w-3.5 h-3.5" />
//                   </button>
//                 </div>
//               ))}

//               {/* New Selected Previews */}
//               {newImagePreviews.map((preview, idx) => (
//                 <div
//                   key={idx}
//                   className="relative group rounded-xl overflow-hidden border border-indigo-300 dark:border-indigo-800 bg-slate-100 aspect-square"
//                 >
//                   <img
//                     src={preview}
//                     alt="New Preview"
//                     className="w-full h-full object-cover"
//                   />
//                   <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-indigo-600 text-white text-[9px] rounded font-mono">
//                     New
//                   </span>
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveNewImage(idx)}
//                     className="absolute top-1 right-1 p-1 bg-red-600/80 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
//                   >
//                     <Trash2 className="w-3.5 h-3.5" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Section 5: Description & Checkbox */}
//           <div className="space-y-4">
//             <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
//               <FileText className="w-4 h-4" /> Description
//             </h3>

//             <div>
//               <textarea
//                 name="description"
//                 rows="4"
//                 required
//                 value={formData.description || ""}
//                 onChange={handleInputChange}
//                 placeholder="Write detailed product description..."
//                 className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
//               />
//             </div>

//             {/* Is Featured Checkbox */}
//             <label className="flex items-center gap-3 cursor-pointer pt-2">
//               <input
//                 type="checkbox"
//                 name="isFeatured"
//                 checked={formData.isFeatured || false}
//                 onChange={handleInputChange}
//                 className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
//               />
//               <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
//                 Mark as Featured Product (Show on Homepage)
//               </span>
//             </label>
//           </div>

//           {/* Modal Footer / Actions */}
//           <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
//             <button
//               type="button"
//               onClick={onClose}
//               disabled={loading}
//               className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-50"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                   <span>Updating...</span>
//                 </>
//               ) : (
//                 <span>Save Changes</span>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateProduct;

// 2

import React, { useState, useEffect } from "react";
import {
  X,
  Upload,
  Trash2,
  Loader2,
  Package,
  DollarSign,
  Tag,
  Layers,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

const AVAILABLE_SIZES = ["S", "M", "L", "XL", "XXL", "3XL"];
const AVAILABLE_COLORS = [
  { name: "Red", class: "bg-red-500" },
  { name: "Black", class: "bg-black" },
  { name: "Blue", class: "bg-blue-500" },
  { name: "Green", class: "bg-emerald-500" },
  { name: "White", class: "bg-white border-slate-300" },
  { name: "Navy", class: "bg-indigo-900" },
  { name: "Yellow", class: "bg-amber-400" },
];

const UpdateProduct = ({ product, isOpen, onClose, onUpdateSuccess }) => {
  const { updateProduct } = useAdmin();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    original_price: "",
    stock: "",
    description: "",
    isFeatured: false,
  });

  console.log(product, " iii");

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  // Cloudinary image object structure: [{ public_id, url }, ...]
  const [existingImages, setExistingImages] = useState([]);
  console.log(existingImages, "existingImages");

  const [newImageFiles, setNewImageFiles] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Clean memory leaks on unmount or preview changes
  useEffect(() => {
    return () => {
      newImagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newImagePreviews]);

  // Populate data when modal opens or product changes
  useEffect(() => {
    if (product && isOpen) {
      setFormData({
        title: product.title || "",
        category: product.category || "",
        price: product.price ?? "",
        original_price: product.original_price ?? "",
        stock: product.stock ?? 0,
        description: product.description || "",
        isFeatured: Boolean(product.isFeatured),
      });

      if (Array.isArray(product.sizes)) {
        setSelectedSizes(product.sizes.map((s) => s.toUpperCase()));
      } else {
        setSelectedSizes([]);
      }

      if (Array.isArray(product.colors)) {
        setSelectedColors(product.colors.map((c) => c.toLowerCase()));
      } else {
        setSelectedColors([]);
      }

      setExistingImages(product.images || []);
      setNewImageFiles([]);
      setNewImagePreviews([]);
      setErrorMsg("");
      setSuccessMsg("");
    }
  }, [product, isOpen]);

  // Conditional rendering check AFTER hooks setup
  if (!isOpen) return null;

  // Handle Text/Number Input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Toggle Sizes
  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  // Toggle Colors
  const toggleColor = (colorName) => {
    const lower = colorName.toLowerCase();
    setSelectedColors((prev) =>
      prev.includes(lower) ? prev.filter((c) => c !== lower) : [...prev, lower],
    );
  };

  // Handle New File Selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setNewImageFiles((prev) => [...prev, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setNewImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  // Remove Existing Cloudinary Image
  const handleRemoveExistingImage = (indexToRemove) => {
    setExistingImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Remove New Upload Preview
  const handleRemoveNewImage = (indexToRemove) => {
    URL.revokeObjectURL(newImagePreviews[indexToRemove]);
    setNewImageFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setNewImagePreviews((prev) =>
      prev.filter((_, idx) => idx !== indexToRemove),
    );
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    // Custom Validation Checks
    if (Number(formData.original_price) < Number(formData.price)) {
      setErrorMsg(
        "Original price must be greater than or equal to selling price!",
      );
      setLoading(false);
      return;
    }

    if (existingImages.length === 0 && newImageFiles.length === 0) {
      setErrorMsg("Please keep at least one image for the product.");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("original_price", formData.original_price);
      data.append("stock", formData.stock);
      data.append("description", formData.description);
      data.append("isFeatured", formData.isFeatured);

      // Arrays sent as comma separated string or per requirement
      data.append("sizes", selectedSizes.join(","));
      data.append("colors", selectedColors.join(","));

      // Existing images stringified array
      data.append("existingImages", JSON.stringify(existingImages));

      // Append new files
      newImageFiles.forEach((file) => {
        data.append("images", file);
      });

      // API Call
      const result = await updateProduct(product._id, data);

      if (result?.success) {
        setSuccessMsg("Product updated successfully!");
        setTimeout(() => {
          if (onUpdateSuccess) {
            onUpdateSuccess(result.payload?.product || result.product);
          }
          onClose();
        }, 1200);
      } else {
        setErrorMsg(result?.message || "Failed to update product.");
      }
    } catch (error) {
      console.error("Update error:", error);
      setErrorMsg("Something went wrong while updating product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden my-8 border border-slate-200/80 dark:border-slate-800 transition-all">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-slate-50/80 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800/80 backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-2xl border border-indigo-100 dark:border-indigo-900/50">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                Update Product
                <Sparkles className="w-4 h-4 text-indigo-500" />
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Modify product parameters, stock levels, variants & imagery
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/80 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar"
        >
          {/* Alerts */}
          {errorMsg && (
            <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200/80 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-semibold rounded-2xl flex items-center gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-xs font-semibold rounded-2xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Section 1: Basic Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <Tag className="w-4 h-4" /> Basic Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Product Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Premium Silk Panjabi"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Category *
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all capitalize"
                >
                  <option value="">Select Category</option>
                  <option value="panjabi">Panjabi</option>
                  <option value="shirt">Shirt</option>
                  <option value="t-shirt">T-Shirt</option>
                  <option value="hoodie">Hoodie</option>
                  <option value="saree">Saree</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Inventory */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> Pricing & Inventory
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Selling Price */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Selling Price (BDT) *
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="1200"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>

              {/* Original Price */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Original Price (Regular) *
                </label>
                <input
                  type="number"
                  name="original_price"
                  required
                  min="0"
                  value={formData.original_price}
                  onChange={handleInputChange}
                  placeholder="1600"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  name="stock"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="50"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Variants */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Product Variants
            </h3>

            {/* Sizes */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
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
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isSelected
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-105"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
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
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-500/20"
                          : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded-full border shadow-xs ${color.class}`}
                      />
                      {color.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 4: Images */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <Upload className="w-4 h-4" /> Images Gallery
            </h3>

            {/* Dropzone */}
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-2xl cursor-pointer bg-slate-50/50 dark:bg-slate-900/30 transition-all group">
              <Upload className="w-7 h-7 text-slate-400 group-hover:text-indigo-500 group-hover:scale-110 transition-all mb-2" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Click to upload new images
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">
                PNG, JPG, WEBP up to 5MB each
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {/* Image Previews */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
              {/* Cloudinary Existing Images */}
              {existingImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 aspect-square"
                >
                  <img
                    src={img}
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-slate-900/70 text-white text-[9px] rounded-md font-mono backdrop-blur-xs">
                    Saved {console.log(img, "img")}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(idx)}
                    className="absolute top-1.5 right-1.5 p-1.5 bg-red-600/90 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all scale-95 hover:scale-100 shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {/* Newly Uploaded Images */}
              {newImagePreviews.map((preview, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-2xl overflow-hidden border border-indigo-300 dark:border-indigo-800 bg-slate-100 dark:bg-slate-800 aspect-square ring-2 ring-indigo-500/20"
                >
                  <img
                    src={preview}
                    alt="New Preview"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-indigo-600 text-white text-[9px] rounded-md font-mono">
                    New
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveNewImage(idx)}
                    className="absolute top-1.5 right-1.5 p-1.5 bg-red-600/90 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all scale-95 hover:scale-100 shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Description & Featured */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Description & Status
            </h3>

            <div>
              <textarea
                name="description"
                rows="4"
                required
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Write detailed product description..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none placeholder:text-slate-400"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer pt-1 group">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20"
              />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Mark as Featured Product (Display on Homepage)
              </span>
            </label>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-800/80">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
