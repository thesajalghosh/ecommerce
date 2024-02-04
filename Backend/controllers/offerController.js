const fs = require("fs");
const offerModal = require("../models/offerModal");
const cloudinary = require("cloudinary");
const { uploadingImage } = require("../helpers/uploadingImage");
const productModel = require("../models/productModel");

const createOfferController = async (req, res) => {
  try {
    const { id, desp, reason } = req.body;
    console.log(desp, id);
    const product = await productModel
      .findOneAndUpdate({ _id: id }, { $set: { desP: desp } }, { new: true })
      .catch((error) => {
        console.error("Update Error:", error);
        throw error;
      });

    console.log(product);
    const offerProduct = new offerModal({
      productId: id,
      offer: reason,
    });

    await offerProduct.save();

    return res.status(200).send({
      success: true,
      message: "successfully created offer",
      product,
      offerProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error in creating offer",
    });
  }
};

const getAllOfferedProduct = async (req, res) => {
  try {
    const offeredProduct = await offerModal.find({});

    res.status(200).send({
      success: true,
      message: "Successfully all product are fetched",
      offeredProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getAllOffered product API",
      error,
    });
  }
};

module.exports = {
  createOfferController,
  getAllOfferedProduct,
};
