const fs = require("fs");
const offerModal = require("../models/offerModal");
const cloudinary = require("cloudinary");
const { uploadingImage } = require("../helpers/uploadingImage");

const createOfferController = async (req, res) => {
  try {
    const result = await uploadingImage(req.file.path);

    if (result && result.secure_url) {
      const offerProduct = new offerModal({
        ...req.body,
        url: result.secure_url,
      });

      await offerProduct.save();
      return res.status(200).send({
        success: true,
        message: "Successfully file is uploaded",
        offerProduct,
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Error in uploading image",
      });
    }
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
