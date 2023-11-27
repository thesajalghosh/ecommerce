const categoryModel = require("../models/categoryModel");
const slagify = require("slugify");

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(401).send({ message: "name is requires" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "category alredy exists",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slagify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "category is created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succcess: false,
      error,
      message: "Error in category ",
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
      succcess: true,
      message: "Category updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succcess: false,
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
      succcess: false,
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
};
