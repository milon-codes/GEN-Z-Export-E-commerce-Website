const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      maxlength: [150, "Product title cannot exceed 150 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["shirt", "panjabi", "pant", "t-shirt"],
        message: "{VALUE} is not a supported category",
      },
      lowercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    original_price: {
      type: Number,
      required: [true, "Original price is required"],
      min: [0, "Original price cannot be negative"],
      validate: {
        validator: function (value) {
          // ১. নতুন ডকুমেন্ট তৈরি করার সময় (doc.save())
          if (this.price !== undefined) {
            return value >= this.price;
          }

          // ২. আপডেট করার সময় (findByIdAndUpdate / findOneAndUpdate)
          if (this.getUpdate) {
            const update = this.getUpdate();

            // $set অপারেটর ব্যবহার করা হয়েছে নাকি সরাসরি অবজেক্ট তা চেক করা
            const currentPrice = update.$set?.price ?? update.price;

            // যদি আপডেটে price পাঠানো হয়ে থাকে, তবে তার সাথে তুলনা করা
            if (currentPrice !== undefined) {
              return Number(value) >= Number(currentPrice);
            }
          }

          // যদি আপডেটে price ফিল্ড পাঠানো না হয়, তাহলে ভ্যালিডেশন পাস করাবে
          return true;
        },
        message:
          "Original price must be greater than or equal to current price",
      },
    },
    currency: {
      type: String,
      default: "BDT",
      uppercase: true,
      trim: true,
    },
    sizes: {
      type: [String],
      required: [true, "At least one size is required"],
      uppercase: true,
      enum: ["S", "M", "L", "XL", "XXL", "Free Size", "30", "32", "34", "36"],
    },
    colors: {
      type: [String],
      required: [true, "At least one color is required"],
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating cannot be more than 5"],
      default: 0,
      set: (val) => Math.round(val * 10) / 10, // 4.6666 -> 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    images: {
      type: [
        {
          url: { type: String, required: true },
          public_id: { type: String, required: true },
        },
      ],
      validate: [
        (val) => val.length > 0,
        "At least one product image is required",
      ],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

productSchema.index({ title: "text", category: "text" });

const Product = model("Product", productSchema);

module.exports = Product;
