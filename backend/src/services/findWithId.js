const createError = require("http-errors");
const User = require("../modles/user");
const { mongoose } = require("mongoose");

const findWithId = async (Modle, id, options = {}) => {
  try {
    const item = await Modle.findById(id, options);

    if (!item) {
      throw createError(404, `${Modle.modelName} dose not exisy with this Id`);
    }
    return item;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(400, `Invalid ${Modle.modelName} Id`);
    }
    throw error;
  }
};

module.exports = {
  findWithId,
};
