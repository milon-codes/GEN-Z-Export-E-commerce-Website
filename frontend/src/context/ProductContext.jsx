import React, { createContext, useEffect, useState } from "react";
import API from "../helper/API";
import { toast } from "sonner";
import { useContext } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [allProduct, setAllProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 👈 লোডিং স্টেট
  const [searchQuery, setSearchQuery] = useState("");

  // 📦 ১. LocalStorage থেকে Cart ও Favorites লোড করা
  const [cart, setCart] = useState(() => {
    try {
      const saveCart = localStorage.getItem("cart");
      return saveCart ? JSON.parse(saveCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saveFavorite = localStorage.getItem("favorite");
      return saveFavorite ? JSON.parse(saveFavorite) : [];
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
      return [];
    }
  });

  // 🌐 ২. Backend থেকে All Products ডাটা লোড করা
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/products");
      console.log(res, "products");

      // ব্যাকএন্ড রেসপন্স চেক Safe Fallback সহ
      const productsData = res.data?.payload?.products;

      setAllProduct(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(
        "প্রোডাক্ট লোড করতে সমস্যা হয়েছে! সার্ভার চালু আছে কিনা চেক করুন।",
      );
    } finally {
      setIsLoading(false); // লোডিং সমাপ্ত
    }
  };
  // // 🌐 ২. Backend থেকে All Products ডাটা লোড করা
  // const fetchProducts = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await API.get("/products");
  //     console.log(res, "products");

  //     // ব্যাকএন্ড রেসপন্স চেক Safe Fallback সহ
  //     const productsData = res.data?.payload?.products;

  //     setAllProduct(productsData);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //     toast.error(
  //       "প্রোডাক্ট লোড করতে সমস্যা হয়েছে! সার্ভার চালু আছে কিনা চেক করুন।",
  //     );
  //   } finally {
  //     setIsLoading(false); // লোডিং সমাপ্ত
  //   }
  // };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 💾 ৩. LocalStorage Sync করা
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorites));
  }, [favorites]);

  // 🛒 ৪. Add to Cart Functionality
  const addToCart = (product) => {
    if (!product) return;
    const pId = product._id || product.id;

    // স্টক ০ চেক
    if (product.stock <= 0) {
      toast.error("দুঃখিত, এই প্রোডাক্টটি স্টক আউট!", {
        id: `out-stock-${pId}`,
      });
      return;
    }

    const isExist = cart.find((item) => (item._id || item.id) === pId);

    if (isExist) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          (item._id || item.id) === pId
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        ),
      );
      toast.success("প্রোডাক্টের পরিমাণ বাড়ানো হয়েছে!", {
        id: `cart-qty-${pId}`,
      });
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
      toast.success("কার্টে যুক্ত করা হয়েছে!", {
        id: `cart-success-${pId}`,
        description: "চেকআউট করতে আপনার কার্ট পেজে যান।",
      });
    }
  };

  // 💖 ৫. Add to Favorites Functionality
  const addToFavorites = (product) => {
    if (!product) return;
    const pId = product._id || product.id;

    const isExist = favorites.find((item) => (item._id || item.id) === pId);

    if (isExist) {
      toast.info("এই প্রোডাক্টটি অলরেডি ফেভারিটে আছে!", {
        id: `fav-exist-${pId}`,
      });
      return;
    }

    setFavorites((prevFavs) => [...prevFavs, product]);
    toast.success("ফেভারিটে যুক্ত করা হয়েছে!", {
      id: `fav-success-${pId}`,
      description: "আপনার পছন্দের তালিকায় প্রোডাক্টটি যোগ হয়েছে।",
    });
  };

  // 💔 ৬. Remove from Favorites Functionality
  const removeFromFavorites = (productId) => {
    if (!productId) return;

    setFavorites((prevFavs) =>
      prevFavs.filter((item) => (item._id || item.id) !== productId),
    );

    toast.success("ফেভারিট থেকে ডিলিট করা হয়েছে!", {
      id: `fav-remove-${productId}`,
    });
  };

  // 🛒 💡 Extra Utility: Remove single item from Cart
  const removeFromCart = (productId) => {
    if (!productId) return;
    setCart((prevCart) =>
      prevCart.filter((item) => (item._id || item.id) !== productId),
    );
    toast.success("কার্ট থেকে প্রোডাক্টটি সরানো হয়েছে!");
  };

  // subscribed
  const subscribed = async (email) => {
    console.log(email);

    try {
      const res = await API.post("/products/subscribe", { email });
      console.log(res.message, "lll");

      return res;
    } catch (error) {
      console.log(error);
    }
  };

  ///////////////////////////////////////

  // ১. কার্ট খালি করার ফাংশন
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart"); // যদি LocalStorage ব্যবহার করে থাকেন
  };

  // ২. backend API-তে অর্ডার সাবমিট করার ফাংশন
  const placeOrder = async (orderData) => {
    setIsLoading(true);
    try {
      // আপনার backend URL অনুযায়ী API endpoint পরিবর্তন করে নেবেন
      const response = await API.post("/orders/create", orderData);
      console.log(response, "order responce");

      if (response.status === 200 || response.status === 201) {
        clearCart(); // অর্ডার সফল হলে কার্ট ক্লিয়ার হয়ে যাবে
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error("Order submission failed:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Order creation failed. Please try again.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  // payment method\

  const initOnlinePayment = async (orderPayload) => {
    try {
      // আপনার ব্যাকএন্ডের অনলাইন পেমেন্ট ইনিশিয়াল এপিআই কল
      const response = await axios.post(
        "http://localhost:5000/api/payment/initiate-payment",
        orderPayload,
      );

      if (response.data?.success && response.data?.url) {
        // পেমেন্ট গেটওয়ে পেজে রিডাইরেক্ট
        window.location.href = response.data.url;
      } else {
        alert(
          response.data?.message ||
            "অনলাইন পেমেন্ট গেটওয়েতে সমস্যা হচ্ছে, আবার চেষ্টা করুন।",
        );
      }
    } catch (error) {
      console.error("Online payment error:", error);
      alert(
        error.response?.data?.message ||
          "পেমেন্ট গেটওয়ে সার্ভারে সংযোগ করা যায়নি।",
      );
    }
  };

  /////////////////////////////////

  // 📦 Provider Value
  const productsInfo = {
    allProduct,
    isLoading,
    fetchProducts,
    searchQuery,
    setSearchQuery,
    cart,
    setCart,
    //
    clearCart,
    placeOrder,
    // payment
    initOnlinePayment,
    //
    addToCart,
    removeFromCart,
    favorites,
    setFavorites,
    addToFavorites,
    removeFromFavorites,

    subscribed,
  };

  return (
    <ProductContext.Provider value={productsInfo}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
