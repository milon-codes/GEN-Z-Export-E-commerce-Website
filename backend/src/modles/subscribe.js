const mongoose = require("mongoose");

const subscribeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
  },
  { timestamps: true },
);

const Subscribe = mongoose.model("Subscribe", subscribeSchema);

module.exports = Subscribe;
