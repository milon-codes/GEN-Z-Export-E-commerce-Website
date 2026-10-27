const createError = require("http-errors");
const { successResponse } = require("./responseController");
const { findWithId } = require("../services/findWithId");
const { deleteImage } = require("../helper/deleteImage");
const Products = require("../modles/product");
const Cart = require("../modles/cart");
const Order = require("../modles/order");
const Subscribe = require("../modles/subscribe");
const cloudinary = require("../config/cloudinary");

// get all product
const getProducts = async (req, res, next) => {
  try {
    const search = req.query.search || "";

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter = {
      $or: [
        { name: { $regex: searchRegExp } },
        { category: { $regex: searchRegExp } },
      ],
    };

    let productQuery = Products.find(filter).sort({ createAt: -1 });

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 0;
    let totalPage = 1;

    if (req.query.limit) {
      const skip = (page - 1) * limit;

      productQuery.skip(skip).limit(limit);
    }

    const products = await productQuery;

    // total product count
    const totalProduct = await Products.countDocuments(filter);

    if (!products || products.length === 0) {
      throw createError(404, "No products found matching your search");
    }

    if (limit > 0) {
      totalPage = Math.ceil(totalProduct / limit);
    }

    successResponse(res, {
      status: 200,
      message: "Products were returned successfully",
      payload: {
        products,
        pagination: {
          totalPage: totalPage,
          currentPage: page,
          previousPage: page > 1 ? page - 1 : null,
          nextPage: page < totalPage ? page + 1 : null,
          totalProduct: totalProduct,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// get Product by id
const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const product = await Products.findById(id);

    if (!product) throw createError(404, "Product not found");

    successResponse(res, {
      status: 200,
      message: "Product were Returned sucessfully",
      payload: { product },
    });
  } catch (error) {
    next(error);
  }
};

// Create a Product
const createProducts = async (req, res, next) => {
  try {
    const {
      id,
      name,
      category,
      price,
      original_price,
      size,
      colors,
      stock,
      rating,
      description,
      image,
    } = req.body || {};

    console.log(
      "products data",
      id,
      name,
      category,
      price,
      original_price,
      size,
      colors,
      stock,
      rating,
      description,
      image,
    );

    // ১. সব ডাটা ঠিকঠাক আছে কিনা যাচাই (৪০০ ব্যাড রিকোয়েস্ট)
    if (
      !id ||
      !name ||
      !category ||
      !price ||
      !original_price ||
      !size ||
      !colors ||
      !stock ||
      !rating ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required and cannot be empty.",
      });
    }

    // ২. ইমেজ ফাইল পাঠানো হয়েছে কিনা যাচাই করা
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Product image is required." });
    }

    // ৩. ক্লাউডিনারিতে ইমেজ আপলোড
    const fileBase64 = req.file.buffer.toString("base64");
    const fileUrl = `data:${req.file.mimetype};base64,${fileBase64}`;
    const uploadResponse = await cloudinary.uploader.upload(fileUrl, {
      folder: "products",
    });
    const image_url = uploadResponse.secure_url;

    // ৪. নতুন প্রোডাক্ট তৈরি ও সেভ করা
    const newProduct = new Products({
      id,
      name,
      category,
      price,
      original_price,
      size,
      colors,
      stock,
      rating,
      description,
      image,
    });
    const product = await newProduct.save();

    // ৫. সেভ না হলে ৫০০ ইন্টারনাল সার্ভার এরর
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product creation failed due to a database error.",
      });
    }

    // ৬. সফল রেসপন্স
    return successResponse(res, {
      status: 201,
      message: "Product created successfully",
      payload: { product },
    });
  } catch (error) {
    // যেকোনো আনএক্সপেক্টেড এরর কনসোলে দেখার জন্য
    console.error("Error in createProducts:", error);

    // আসল এরর মেসেজটি ক্লায়েন্টকে পাঠানো হচ্ছে
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "failed to create products",
    });
  }
};

// Delete a Product with id
const deleteProducts = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw createError(404, "No-empty value not accepted");
    }

    const product = await Products.findByIdAndDelete(id);

    if (!product) {
      throw createError(401, "Product not fount ");
    }

    successResponse(res, {
      status: 201,
      message: "Products deleted sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

// update product by id
const updateProducts = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    if (!id) {
      throw createError(404, "No-empty value not accepted");
    }

    const updatedProduct = await Products.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      throw createError(401, "Product not fount ");
    }

    successResponse(res, {
      status: 201,
      message: "Products updated sucessfully",
      payload: { updatedProduct },
    });
  } catch (error) {
    next(error);
  }
};

// cart
const addProductToCart = async (req, res, next) => {
  try {
    const { userId, productId, price, quantity } = req.body;

    const product = await Products.findById(productId);

    if (!product) throw createError(401, "Product not found");

    const actualPrice = product.price;
    const qty = Number(quantity);

    let cart = await Cart.findOne({ userId });

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId,
      );
      if (productIndex > -1) {
        cart.products[productIndex].quantity += qty;
      } else {
        cart.products.push({ productId, quantity: qty, price: actualPrice });
      }

      cart.totalPrice += actualPrice * qty;
      await cart.save();

      return successResponse(res, {
        status: 200,
        message: "Cart updated sucessfully",
      });
    } else {
      const newCart = await Cart.create({
        userId,
        products: [{ productId, price: actualPrice, quantity: qty }],
        totalPrice: actualPrice * qty,
      });
      successResponse(res, {
        status: 201,
        message: "Cart Created sucessfully",
        payload: { newCart },
      });
    }
  } catch (error) {
    next(error);
  }
};

// order confrim
const orderProducts = async (req, res, next) => {
  try {
    const { userId, paymentMethod, shippingAddress } = req.body || {};
    if (!userId || !paymentMethod || !shippingAddress) {
      throw createError(400, "not empty value accepted");
    }

    let cart = await Cart.findOne({ userId });

    if (!cart || cart.products.length === 0) {
      throw createError(400, "Cart not found");
    }

    const newOrder = new Order({
      userId,
      products: cart.products,
      totalPrice: cart.totalPrice,
      paymentMethod,
      shippingAddress,
    });

    await newOrder.save();

    const deletedCart = await Cart.findOneAndDelete({ userId });
    if (deletedCart) {
      console.log("cart was deleted");
    }
    console.log("cart no detele");

    successResponse(res, {
      status: 201,
      message: "Order Requiest sucessfully",
      payload: { newOrder },
    });
  } catch (error) {
    next(error);
  }
};

// get order
const getOrderHistory = async (req, res, next) => {
  try {
    const orderHistory = await Order.find();

    if (!orderHistory || orderHistory.length === 0) {
      throw createError(400, "Order Histroy not found ");
    }

    successResponse(res, {
      status: 200,
      message: "Order History reatruned sucessfully",
      payload: { orderHistory },
    });
  } catch (error) {
    next(error);
  }
};

// get my orders
const getMyOrders = async (req, res, next) => {
  try {
    const userId = req.body;
    const id = req.user.userId;

    console.log("use", id);

    const userOrders = await Order.find({ userId: id }).sort({ createAt: -1 });

    if (!userOrders || userOrders.length === 0) {
      throw createError(400, "Order not found ");
    }

    successResponse(res, {
      status: 200,
      message: "Order reatruned sucessfully",
      payload: { userOrders },
    });
  } catch (error) {
    next(error);
  }
};

// Subscribe
const createSubscribe = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw createError(401, "Email not found ");
    }

    const subscribed = await Subscribe.findOne({ email });
    console.log(email);

    if (subscribed) {
      throw createError(401, "with this alredy Subscribed");
    }

    await Subscribe.create({ email });

    successResponse(res, {
      status: 201,
      message: "Subscribed sucessfully",
    });
  } catch (error) {
    console.log(error.message);
    throw createError(401, error.message);
    next(error);
  }
};

module.exports = {
  getProducts,
  createProducts,
  deleteProducts,
  getProductById,
  updateProducts,
  addProductToCart,
  orderProducts,
  getOrderHistory,
  getMyOrders,

  createSubscribe,
};
