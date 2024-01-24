const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCategoryController,
  categoryDeleteController,
  getCategoryPhotoController,
} = require("../controllers/CategoryController");
const formidable = require("express-formidable");

const router = express.Router();

//routes

//create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  formidable(),
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//get category photo
router.get("/get-category-photo/:cid", getCategoryPhotoController);

//get all category
router.get("/get-all-category", categoryController);

//get single category
router.get("/single-category/:slug", singleCategoryController);

//deleting category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  categoryDeleteController
);

module.exports = router;
