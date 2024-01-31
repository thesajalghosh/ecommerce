const categoryModel = require("../models/categoryModel");
const slagify = require("slugify");
const { uploadingImage } = require("../helpers/uploadingImage");

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const photo = req.files;
    console.log(name);
    console.log(photo);

    const uploadedFile = req.files.file;

    // console.log(uploadedFile);

    res.status(200).send({
      success: true,
      message: "category is created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in category ",
    });
  }
};

const getCategoryPhotoController = async (req, res) => {
  try {
    const category = await categoryModel
      .findById(req.params.cid)
      .select("photo");
    if (category.photo.data) {
      res.set("content-type", category.photo.contentType);
      return res.status(200).send(category.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get category photo controller",
      error,
    });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slagify(name) },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Category updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while updating category",
    });
  }
};

//get all category
const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "all category list",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while getting all categories",
    });
  }
};

//get single category
const singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await categoryModel.find({ slug });
    res.status(200).send({
      success: true,
      message: "get single category successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in getting in single category",
    });
  }
};
//get delete category
const categoryDeleteController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succcess: false,
      error,
      message: "error in deleting the category",
    });
  }
};

module.exports = {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCategoryController,
  categoryDeleteController,
  getCategoryPhotoController,
};
