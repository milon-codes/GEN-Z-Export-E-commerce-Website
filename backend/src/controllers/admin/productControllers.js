const createError = require("http-errors");
const slugify = require("slugify");

const { successResponse } = require("../responseController");
// const { findWithId } = require("../services/findWithId");
// const { deleteImage } = require("../helper/deleteImage");
const Product = require("../../modles/product");
const Cart = require("../../modles/cart");
const Order = require("../../modles/order");
const cloudinary = require("../../config/cloudinary");

// get all product
const getAllProduct = async (req, res, next) => {
  try {
    const search = req.query.search || "";

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter = {
      $or: [
        { name: { $regex: searchRegExp } },
        { category: { $regex: searchRegExp } },
      ],
    };

    let productQuery = Product.find(filter).sort({ createAt: -1 });

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 0;
    let totalPage = 1;

    if (req.query.limit) {
      const skip = (page - 1) * limit;

      productQuery.skip(skip).limit(limit);
    }

    const products = await productQuery;

    // total product count
    const totalProduct = await Product.countDocuments(filter);

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

// Create Product with Multiple Images
const createProducts = async (req, res, next) => {
  try {
    const {
      title,
      category,
      price,
      original_price,
      sizes,
      colors,
      stock,
      description,
      isFeatured,
    } = req.body || {};

    console.log(
      title,
      category,
      price,
      original_price,
      sizes,
      colors,
      stock,
      description,
      isFeatured,
      "products data",
    );

    // ১. প্রয়োজনীয় ফিল্ড ভ্যালিডেশন
    if (
      !title ||
      !category ||
      !price ||
      !original_price ||
      !description ||
      !sizes ||
      !colors
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Required fields (title, category, price, original_price, description, sizes, colors) are missing.",
      });
    }

    // ২. প্রাইস লজিক ভ্যালিডেশন (Original price অবশ্যই Price এর সমান বা বড় হতে হবে)
    const numPrice = Number(price);
    const numOriginalPrice = Number(original_price);

    if (numOriginalPrice < numPrice) {
      return res.status(400).json({
        success: false,
        message:
          "Original price must be greater than or equal to current price.",
      });
    }

    // ৩. ইমেজ ফাইলস আপলোড চেক
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one product image is required.",
      });
    }

    // ৪. ইউনিক Slug তৈরি করা
    let generatedSlug = slugify(title, { lower: true, strict: true });

    // Slug ডাটাবেজে অলরেডি আছে কিনা চেক করা
    const existingProduct = await Product.findOne({ slug: generatedSlug });
    if (existingProduct) {
      generatedSlug = `${generatedSlug}-${Date.now()}`;
    }

    // ৫. একাধিক ছবি ক্লাউডিনারিতে আপলোড করা (Parallel Upload)
    const imageUploadPromises = req.files.map(async (file) => {
      const fileBase64 = file.buffer.toString("base64");
      const fileUrl = `data:${file.mimetype};base64,${fileBase64}`;

      const uploadResponse = await cloudinary.uploader.upload(fileUrl, {
        folder: "products",
      });

      return {
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
      };
    });

    const uploadedImages = await Promise.all(imageUploadPromises);

    // ৬. FormData থেকে আসা Array এবং String নিরাপদভাবে প্রসেস করা
    let parsedSizes = [];
    if (Array.isArray(sizes)) {
      parsedSizes = sizes.map((s) => s.trim().toUpperCase());
    } else if (typeof sizes === "string") {
      parsedSizes = sizes.split(",").map((s) => s.trim().toUpperCase());
    }

    let parsedColors = [];
    if (Array.isArray(colors)) {
      parsedColors = colors.map((c) => c.trim().toLowerCase());
    } else if (typeof colors === "string") {
      parsedColors = colors.split(",").map((c) => c.trim().toLowerCase());
    }

    // ৭. ডাটাবেজে প্রোডাক্ট সেভ করা
    const newProduct = new Product({
      title,
      slug: generatedSlug,
      category: category.toLowerCase(),
      price: numPrice,
      original_price: numOriginalPrice,
      sizes: parsedSizes,
      colors: parsedColors,
      stock: stock !== undefined ? Number(stock) : 0,
      description,
      images: uploadedImages,
      isFeatured: isFeatured === "true" || isFeatured === true,
    });

    const product = await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      payload: { product },
    });
  } catch (error) {
    console.error("Error in createProducts:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to create product",
    });
  }
};
// Update Product with Partial/Selective Image Cleanup
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // ১. ডাটাবেজ থেকে প্রোডাক্ট খোঁজা
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // --- (ক) রেখে দেওয়া পুরানো ছবি প্রসেস করা ---
    let keptImages = [];
    const rawExisting = req.body.existingImages || req.body.images;

    if (rawExisting) {
      try {
        const parsed =
          typeof rawExisting === "string"
            ? JSON.parse(rawExisting)
            : rawExisting;
        if (Array.isArray(parsed)) {
          keptImages = parsed;
        } else if (typeof parsed === "object" && parsed !== null) {
          keptImages = [parsed];
        }
      } catch (err) {
        if (typeof rawExisting === "string") {
          const match = existingProduct.images.find(
            (img) => img.url === rawExisting,
          );
          if (match) keptImages = [match];
        }
      }
    }

    // ডাটা ফরম্যাট ঠিক রাখা ({ url, public_id })
    keptImages = keptImages
      .map((img) => {
        if (typeof img === "string") {
          const found = existingProduct.images.find((ex) => ex.url === img);
          return found ? found : { url: img, public_id: "unknown" };
        }
        return img;
      })
      .filter((img) => img && img.url);

    // --- (খ) এডমিন যে ছবিগুলো কেটে দিয়েছে সেগুলো Cloudinary থেকে ডিলিট করা ---
    const keptPublicIds = new Set(keptImages.map((img) => img.public_id));
    const imagesToDelete = existingProduct.images.filter(
      (img) => img.public_id && !keptPublicIds.has(img.public_id),
    );

    if (imagesToDelete.length > 0) {
      const deletePromises = imagesToDelete.map((img) => {
        if (img.public_id) {
          return cloudinary.uploader.destroy(img.public_id); // Cloudinary থেকে ডিলিট
        }
      });
      await Promise.all(deletePromises);
    }

    // --- (গ) নতুন কোনো ফাইল আপলোড হলে Cloudinary-তে পাঠানো ---
    let newlyUploadedImages = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        const fileBase64 = file.buffer.toString("base64");
        const fileUrl = `data:${file.mimetype};base64,${fileBase64}`;

        const uploadResponse = await cloudinary.uploader.upload(fileUrl, {
          folder: "products",
        });

        return {
          url: uploadResponse.secure_url,
          public_id: uploadResponse.public_id,
        };
      });

      newlyUploadedImages = await Promise.all(uploadPromises);
    }

    // --- (ঘ) ফাইনাল ছবি মার্চ করা ---
    const finalImages = [...keptImages, ...newlyUploadedImages];

    // 🔴 Validation 1: কমপক্ষে ১টি ছবি থাকা বাধ্যতামূলক
    if (finalImages.length === 0) {
      return res.status(400).json({
        success: false,
        message: "কমপক্ষে ১টি ছবি দেওয়া বাধ্যতামূলক!",
      });
    }

    // 🔴 Validation 2: সর্বোচ্চ ৫টি ছবির বেশি দেওয়া যাবে না
    if (finalImages.length > 5) {
      return res.status(400).json({
        success: false,
        message: `সর্বোচ্চ ৫টি ছবি রাখা যাবে। আপনি মোট ${finalImages.length}টি ছবি দিয়েছেন (পুরানো + নতুন মিলেই)!`,
      });
    }

    // --- ২. অন্যান্য Body ডাটা প্রসেস করা ---
    const { images, existingImages, ...cleanBody } = req.body;
    const updateData = { ...cleanBody };

    // Title / Slug / Category / Sizes / Colors প্রসেস
    if (req.body.title && req.body.title !== existingProduct.title) {
      let generatedSlug = slugify(req.body.title, {
        lower: true,
        strict: true,
      });
      const slugExists = await Product.findOne({
        slug: generatedSlug,
        _id: { $ne: id },
      });
      if (slugExists) generatedSlug = `${generatedSlug}-${Date.now()}`;
      updateData.slug = generatedSlug;
    }

    if (req.body.category)
      updateData.category = req.body.category.toLowerCase();

    if (req.body.sizes) {
      updateData.sizes =
        typeof req.body.sizes === "string"
          ? req.body.sizes.split(",").map((s) => s.trim().toUpperCase())
          : req.body.sizes;
    }

    if (req.body.colors) {
      updateData.colors =
        typeof req.body.colors === "string"
          ? req.body.colors.split(",").map((c) => c.trim())
          : req.body.colors;
    }

    if (req.body.price !== undefined) updateData.price = Number(req.body.price);
    if (req.body.original_price !== undefined)
      updateData.original_price = Number(req.body.original_price);
    if (req.body.stock !== undefined) updateData.stock = Number(req.body.stock);
    if (req.body.isFeatured !== undefined) {
      updateData.isFeatured =
        req.body.isFeatured === "true" || req.body.isFeatured === true;
    }

    // ফাইনাল ইমেজ সেট করা
    updateData.images = finalImages;

    // ৩. ডাটাবেজ আপডেট
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(updateProduct, "product update");

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      payload: { product: updatedProduct },
    });
  } catch (error) {
    console.error("Error in updateProduct:", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to update product",
    });
  }
};
// Delete a Product with id v
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

// get all order admin
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

module.exports = {
  getAllProduct,
  createProducts,
  deleteProducts,
  getProductById,
  updateProduct,
  getOrderHistory,
};
