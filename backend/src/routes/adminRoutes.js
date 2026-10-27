const express = require("express");
const router = express.Router();

// Controllers
const {
  getUsers,
  userFindWithId,
  addUsers,
  userUpdateWithId,
  userDeleteWithId,
} = require("../controllers/admin/adminControllers");

const {
  getAllProduct,
  createProducts,
  deleteProducts,
  updateProduct,
  getOrderHistory,
} = require("../controllers/admin/productControllers");

// Middlewares
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Base path: /api/admin
// Apply authentication & admin authorization to all admin routes
router.use(protect, isAdmin);

// ==========================================
//               USER ROUTES
// ==========================================
router.get("/users", getUsers);
router.get("/users/:id", userFindWithId);
router.post("/users/add", addUsers);
router.put("/users/:id", userUpdateWithId);
router.delete("/users/:id", userDeleteWithId);

// ==========================================
//              ORDER ROUTES
// ==========================================
// Always keep fixed routes ABOVE parameterized (:id) product routes!
router.get("/orders", getOrderHistory);

// ==========================================
//             PRODUCT ROUTES
// ==========================================
router.get("/products", getAllProduct);
router.post("/products/create", upload.array("images", 5), createProducts);
router.put("/products/:id", upload.array("images", 5), updateProduct);
router.delete("/products/:id", deleteProducts);

// ==========================================
//              BANNER ROUTES
// ==========================================
// Future banner routes will go here

module.exports = router;
