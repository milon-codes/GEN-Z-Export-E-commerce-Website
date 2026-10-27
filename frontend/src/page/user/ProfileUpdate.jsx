// import React, { useState, useEffect } from "react";
// import API from "../../helper/API";
// import {
//   FiX,
//   FiUser,
//   FiPhone,
//   FiMapPin,
//   FiLock,
//   FiCheckCircle,
//   FiAlertCircle,
//   FiLoader,
//   FiSave,
// } from "react-icons/fi";

// const ProfileUpdate = ({ isOpen, onClose, currentUser, onUpdateSuccess }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });

//   // ইউজার ডাটা দিয়ে ফর্ম স্টেট ইনিশিয়ালাইজ করা
//   useEffect(() => {
//     if (currentUser) {
//       setFormData((prev) => ({
//         ...prev,
//         name: currentUser.name || "",
//         phone: currentUser.phone || "",
//         address: currentUser.address || "",
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       }));
//     }
//   }, [currentUser, isOpen]);

//   if (!isOpen) return null;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const showAlert = (type, text) => {
//     setMessage({ type, text });
//     setTimeout(() => setMessage({ type: "", text: "" }), 4000);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     let isProfileChanged = false;
//     let isPasswordChanged = false;

//     try {
//       // ১. বেসিক ডাটা আপডেটের লজিক
//       if (
//         formData.name !== currentUser?.name ||
//         formData.phone !== currentUser?.phone ||
//         formData.address !== currentUser?.address
//       ) {
//         const profilePayload = {
//           name: formData.name,
//           phone: formData.phone,
//           address: formData.address,
//         };
//         await API.put("/auth/profile", profilePayload);
//         isProfileChanged = true;
//       }

//       // ২. পাসওয়ার্ড আপডেটের লজিক
//       if (
//         formData.currentPassword ||
//         formData.newPassword ||
//         formData.confirmPassword
//       ) {
//         if (!formData.currentPassword || !formData.newPassword) {
//           setLoading(false);
//           return showAlert(
//             "error",
//             "পাসওয়ার্ড পরিবর্তন করতে বর্তমান ও নতুন পাসওয়ার্ড দুটিই দিন।",
//           );
//         }
//         if (formData.newPassword.length < 6) {
//           setLoading(false);
//           return showAlert(
//             "error",
//             "নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!",
//           );
//         }
//         if (formData.newPassword !== formData.confirmPassword) {
//           setLoading(false);
//           return showAlert("error", "নতুন পাসওয়ার্ড দুটি মিলছে না!");
//         }

//         const passwordPayload = {
//           currentPassword: formData.currentPassword,
//           newPassword: formData.newPassword,
//         };
//         await API.put("/auth/update-password", passwordPayload);
//         isPasswordChanged = true;
//       }

//       // ৩. রেসপন্স ফিডব্যাক
//       if (isProfileChanged && isPasswordChanged) {
//         showAlert("success", "প্রোফাইল এবং পাসওয়ার্ড সফলভাবে আপডেট হয়েছে!");
//       } else if (isProfileChanged) {
//         showAlert("success", "প্রোফাইল ডাটা সফলভাবে আপডেট হয়েছে!");
//       } else if (isPasswordChanged) {
//         showAlert("success", "পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!");
//       } else {
//         showAlert("info", "আপনি কোনো তথ্য পরিবর্তন করেননি।");
//       }

//       setFormData((prev) => ({
//         ...prev,
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       }));

//       // প্যারেন্ট কম্পোনেন্ট বা ড্যাশবোর্ডে ডাটা রিফ্রেশ করার জন্য
//       if (onUpdateSuccess && (isProfileChanged || isPasswordChanged)) {
//         setTimeout(() => {
//           onUpdateSuccess();
//           onClose();
//         }, 1200);
//       }
//     } catch (error) {
//       showAlert(
//         "error",
//         error.response?.data?.message || "আপডেট করতে সমস্যা হয়েছে।",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
//       <div className="relative w-full max-w-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2rem] p-6 sm:p-8 shadow-2xl space-y-6 overflow-hidden text-left max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
//           <h3 className="text-lg font-black uppercase tracking-wide text-neutral-900 dark:text-white">
//             প্রোফাইল সেটিংস
//           </h3>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
//           >
//             <FiX size={20} />
//           </button>
//         </div>

//         {/* Alerts */}
//         {message.text && (
//           <div
//             className={`p-3.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
//               message.type === "success"
//                 ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-500"
//                 : message.type === "info"
//                   ? "bg-blue-500/10 border border-blue-500/20 text-blue-500"
//                   : "bg-rose-500/10 border border-rose-500/20 text-rose-500"
//             }`}
//           >
//             {message.type === "success" ? (
//               <FiCheckCircle size={16} />
//             ) : (
//               <FiAlertCircle size={16} />
//             )}
//             {message.text}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div className="space-y-4">
//             <h4 className="text-xs font-black uppercase tracking-wider text-[#C5A059]">
//               মূল তথ্য
//             </h4>

//             <div>
//               <label className="block text-[11px] font-black uppercase text-neutral-500 mb-1">
//                 নাম
//               </label>
//               <div className="relative flex items-center">
//                 <FiUser
//                   className="absolute left-3.5 text-neutral-400"
//                   size={16}
//                 />
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-bold focus:outline-none focus:border-[#C5A059]"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-[11px] font-black uppercase text-neutral-500 mb-1">
//                 ফোন নম্বর
//               </label>
//               <div className="relative flex items-center">
//                 <FiPhone
//                   className="absolute left-3.5 text-neutral-400"
//                   size={16}
//                 />
//                 <input
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-bold focus:outline-none focus:border-[#C5A059]"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-[11px] font-black uppercase text-neutral-500 mb-1">
//                 ঠিকানা
//               </label>
//               <div className="relative flex items-center">
//                 <FiMapPin
//                   className="absolute left-3.5 text-neutral-400"
//                   size={16}
//                 />
//                 <input
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-bold focus:outline-none focus:border-[#C5A059]"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Password Section */}
//           <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-4">
//             <h4 className="text-xs font-black uppercase tracking-wider text-rose-500">
//               পাসওয়ার্ড পরিবর্তন (ঐচ্ছিক)
//             </h4>

//             <div>
//               <input
//                 type="password"
//                 name="currentPassword"
//                 value={formData.currentPassword}
//                 onChange={handleChange}
//                 placeholder="বর্তমান পাসওয়ার্ড"
//                 className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-bold focus:outline-none focus:border-[#C5A059]"
//               />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <input
//                 type="password"
//                 name="newPassword"
//                 value={formData.newPassword}
//                 onChange={handleChange}
//                 placeholder="নতুন পাসওয়ার্ড"
//                 className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-bold focus:outline-none focus:border-[#C5A059]"
//               />
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="পাসওয়ার্ড নিশ্চিত করুন"
//                 className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-bold focus:outline-none focus:border-[#C5A059]"
//               />
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-100 dark:border-neutral-800">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-5 py-2.5 rounded-xl text-xs font-black uppercase text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
//             >
//               বাতিল
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#C5A059] text-neutral-950 hover:bg-[#b08e4d] text-xs font-black uppercase disabled:opacity-50"
//             >
//               {loading ? (
//                 <FiLoader className="animate-spin" size={16} />
//               ) : (
//                 <>
//                   <FiSave size={16} /> সেভ করুন
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProfileUpdate;

//2
import React, { useState, useEffect } from "react";
import API from "../../helper/API";
import {
  FiX,
  FiUser,
  FiPhone,
  FiMapPin,
  FiLock,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
  FiSave,
  FiCamera,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

const ProfileUpdate = ({ isOpen, onClose, currentUser, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Avatar & Image Upload States
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  // Password Visibility Controls
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // ইউজার ডাটা দিয়ে ফর্ম স্টেট ইনিশিয়ালাইজ করা
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: currentUser.name || "",
        phone: currentUser.phone || "",
        address: currentUser.address || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setAvatarPreview(currentUser.avatar || currentUser.image || "");
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Profile Image Selection & Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        return showAlert("error", "ছবি ৩ মেগাবাইটের কম সাইজের হতে হবে!");
      }
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const showAlert = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let isProfileChanged = false;
    let isPasswordChanged = false;

    try {
      // ১. বেসিক ডাটা এবং প্রোফাইল পিকচার আপডেটের লজিক
      if (
        formData.name !== currentUser?.name ||
        formData.phone !== currentUser?.phone ||
        formData.address !== currentUser?.address ||
        avatar !== null
      ) {
        const profilePayload = new FormData();
        profilePayload.append("name", formData.name);
        profilePayload.append("phone", formData.phone);
        profilePayload.append("address", formData.address);

        if (avatar) {
          profilePayload.append("avatar", avatar); // Backend API handles 'avatar' image
        }

        await API.put("/auth/profile", profilePayload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        isProfileChanged = true;
      }

      // ২. পাসওয়ার্ড আপডেটের লজিক
      if (
        formData.currentPassword ||
        formData.newPassword ||
        formData.confirmPassword
      ) {
        if (!formData.currentPassword || !formData.newPassword) {
          setLoading(false);
          return showAlert(
            "error",
            "পাসওয়ার্ড পরিবর্তন করতে বর্তমান ও নতুন পাসওয়ার্ড দুটিই দিন।",
          );
        }
        if (formData.newPassword.length < 6) {
          setLoading(false);
          return showAlert(
            "error",
            "নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!",
          );
        }
        if (formData.newPassword !== formData.confirmPassword) {
          setLoading(false);
          return showAlert("error", "নতুন পাসওয়ার্ড দুটি মিলছে না!");
        }

        const passwordPayload = {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        };
        await API.put("/auth/update-password", passwordPayload);
        isPasswordChanged = true;
      }

      // ৩. রেসপন্স ফিডব্যাক
      if (isProfileChanged && isPasswordChanged) {
        showAlert("success", "প্রোফাইল এবং পাসওয়ার্ড সফলভাবে আপডেট হয়েছে!");
      } else if (isProfileChanged) {
        showAlert("success", "প্রোফাইল ডাটা সফলভাবে আপডেট হয়েছে!");
      } else if (isPasswordChanged) {
        showAlert("success", "পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!");
      } else {
        showAlert("info", "আপনি কোনো তথ্য পরিবর্তন করেননি।");
      }

      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      // প্যারেন্ট কম্পোনেন্ট বা ড্যাশবোর্ডে ডাটা রিফ্রেশ করার জন্য
      if (onUpdateSuccess && (isProfileChanged || isPasswordChanged)) {
        setTimeout(() => {
          onUpdateSuccess();
          onClose();
        }, 1200);
      }
    } catch (error) {
      showAlert(
        "error",
        error.response?.data?.message || "আপডেট করতে সমস্যা হয়েছে।",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl space-y-6 overflow-hidden text-left max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <h3 className="text-lg font-black uppercase tracking-wide text-neutral-900 dark:text-white">
            প্রোফাইল সেটিংস
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Alerts */}
        {message.text && (
          <div
            className={`p-3.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
              message.type === "success"
                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-500"
                : message.type === "info"
                  ? "bg-blue-500/10 border border-blue-500/20 text-blue-500"
                  : "bg-rose-500/10 border border-rose-500/20 text-rose-500"
            }`}
          >
            {message.type === "success" ? (
              <FiCheckCircle size={16} />
            ) : (
              <FiAlertCircle size={16} />
            )}
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar / Profile Image Upload Section */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#C5A059] bg-neutral-100 dark:bg-neutral-950 group">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Profile Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-400">
                  <FiUser size={40} />
                </div>
              )}
              <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white cursor-pointer transition-opacity duration-300">
                <FiCamera size={22} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              প্রোফাইল ছবি পরিবর্তন করুন
            </span>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#C5A059]">
              মূল তথ্য
            </h4>

            <div>
              <label className="block text-[11px] font-black uppercase text-neutral-500 mb-1">
                নাম
              </label>
              <div className="relative flex items-center">
                <FiUser
                  className="absolute left-3.5 text-neutral-400"
                  size={16}
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase text-neutral-500 mb-1">
                ফোন নম্বর
              </label>
              <div className="relative flex items-center">
                <FiPhone
                  className="absolute left-3.5 text-neutral-400"
                  size={16}
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase text-neutral-500 mb-1">
                ঠিকানা
              </label>
              <div className="relative flex items-center">
                <FiMapPin
                  className="absolute left-3.5 text-neutral-400"
                  size={16}
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-rose-500">
              পাসওয়ার্ড পরিবর্তন (ঐচ্ছিক)
            </h4>

            {/* Current Password Field */}
            <div className="relative flex items-center">
              <input
                type={showCurrentPass ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="বর্তমান পাসওয়ার্ড"
                className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-[#C5A059]"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPass(!showCurrentPass)}
                className="absolute right-3.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                {showCurrentPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* New Password Field */}
              <div className="relative flex items-center">
                <input
                  type={showNewPass ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="নতুন পাসওয়ার্ড"
                  className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-[#C5A059]"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-3.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                  {showNewPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>

              {/* Confirm Password Field */}
              <div className="relative flex items-center">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                  className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-[#C5A059]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                  {showConfirmPass ? (
                    <FiEyeOff size={16} />
                  ) : (
                    <FiEye size={16} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-100 dark:border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-black uppercase text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#C5A059] text-neutral-950 hover:bg-[#b08e4d] text-xs font-black uppercase disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <FiLoader className="animate-spin" size={16} />
              ) : (
                <>
                  <FiSave size={16} /> সেভ করুন
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
