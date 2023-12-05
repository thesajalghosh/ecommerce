const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createProductController,
  getProductController,
  getSingleProductController,
  getPhotoController,
  deleteProductController,
  updateProductController,
} = require("../controllers/productController");
const formidable = require("express-formidable");

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//update product routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:pid", getSingleProductController);

//get photo
router.get("/product-photo/:pid", getPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

module.exports = router;