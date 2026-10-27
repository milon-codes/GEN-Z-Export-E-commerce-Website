const createError = require("http-errors");
const bcrypt = require("bcryptjs");

const User = require("../../modles/user");
const { successResponse, errorResponse } = require("../responseController");
const { findWithId } = require("../../services/findWithId");
const { deleteImage } = require("../../helper/deleteImage");

// add user
const addUsers = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    // 1. ইনপুট চেক (ভুল বা ফাঁকা ডাটার জন্য 400 Bad Request ব্যবহার করা হলো)
    if (!name || !email || !phone) {
      throw createError(400, "All inputs (name, email, phone) are required.");
    }

    // 2. ইউজার অলরেডি আছে কিনা চেক
    const userExists = await User.exists({ email });
    if (userExists) {
      throw createError(409, "User with this email already exists.");
    }

    // 3. নতুন ইউজার তৈরি ও সেভ
    const newUser = new User({
      name,
      email,
      phone,
    });
    await newUser.save();

    // 4. সফল রেসপন্স
    successResponse(res, {
      status: 201, // ইউজার ক্রিয়েট হলে সাধারণত 201 Created দেওয়া ভালো
      message: "User Created Successfully",
      payload: { user: newUser }, // নতুন ইউজারের ডাটা ফ্রন্টএন্ডে পাঠাতে পারেন
    });
  } catch (error) {
    next(error);
  }
};

// get all user   admin
const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
      ],
    };

    const skip = (page - 1) * limit;

    // user data fetch
    const users = await User.find(filter).skip(skip).limit(limit);

    // total user count
    const totalUser = await User.countDocuments(filter);

    if (!users || users.length === 0) {
      return next(createError(404, "No users found"));
    }

    const totalPage = Math.ceil(totalUser / limit);

    return successResponse(res, {
      status: 200,
      message: "Users were returned successfully",
      payload: {
        users,
        pagination: {
          totalPage,
          currentPage: page,
          previousPage: page > 1,
          nextPage: page < totalPage,
          totalUser,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// get user by id  admin
const userFindWithId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);

    successResponse(res, {
      status: 200,
      message: "User was Returned sucessfuuly",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

// user update by id admin
const userUpdateWithId = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { name, password } = req.body; // বডি থেকে নতুন নাম ও পাসওয়ার্ড নেওয়া

    const updateData = {};
    if (name) updateData.name = name;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      {
        new: true,
      },
    );

    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updateUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// user delete by id admin
const userDeleteWithId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);

    const userImagePath = user.image;

    if (user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "admin cannot be deleted",
      });
    }

    deleteImage(userImagePath);

    await User.findByIdAndDelete(id);

    successResponse(res, {
      status: 200,
      message: "User were deleted sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  userFindWithId,
  addUsers,
  userUpdateWithId,
  userDeleteWithId,
};
