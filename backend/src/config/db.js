const mongoose = require("mongoose");
const { mongodbURL } = require("../secret");

const connectDB = async (options = {}) => {
  try {
    await mongoose.connect(mongodbURL, options);
    console.log("Connection to DB is Successfully established");
    mongoose.connection.on("error", (error) => {
      console.error("Db connection error", error);
    });
  } catch (error) {
    console.log(error, "error");

    console.error("could not connect to DB:", error.toString());
  }
};

module.exports = connectDB;
