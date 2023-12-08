const slugify = require("slugify");
const productModel = require("../models/productModel");
const fs = require("fs");

const createProductController = async (req, res) => {
  try {
    // console.log(req.fields,"fields");
    const { name, description, price, category, quantity } = req.fields;
    console.log(name, description, price, category, quantity, "field");
    const { photo } = req.files;

    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "description is Required" });
      case !price:
        return res.status(500).send({ error: "price is Required" });
      case !category:
        return res.status(500).send({ error: "category is Required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is Required" });

      // case !shipping:
      //   return res.status(500).send({ error: "shipping is Required" });
      case photo & (photo.size > 100000):
        return res
          .status(500)
          .send({ error: "photo is Required should be 1 MB" });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "product Create Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

// update product controller
const updateProductController = async (req, res) => {
  try {
    // console.log(req.fields,"fields");
    const { name, description, price, category, quantity } = req.fields;
    console.log(name, description, price, category, quantity, "field");
    const { photo } = req.files;
    console.log(photo, "files");

    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "description is Required" });
      case !price:
        return res.status(500).send({ error: "price is Required" });
      case !category:
        return res.status(500).send({ error: "category is Required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is Required" });

      // case !shipping:
      //   return res.status(500).send({ error: "shipping is Required" });
      case photo & (photo.size > 100000):
        return res
          .status(500)
          .send({ error: "photo is Required should be 1 MB" });
    }
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "product updateSuccessfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in update product api",
    });
  }
};

const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      totalCount: products.length,
      message: "All Products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in get product controller",
    });
  }
};

//get single product
const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .find({ _id: req.params.pid })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "single product fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "error in get single product api",
      error,
    });
  }
};

//get photo
const getPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: true,
      message: "error in get photo controller",
      error,
    });
  }
};

//delete product

const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in delete api",
      error,
    });
  }
};

module.exports = {
  createProductController,
  getProductController,
  getSingleProductController,
  getPhotoController,
  deleteProductController,
  updateProductController,
};
