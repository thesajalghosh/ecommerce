const express = require("express");
const {
  createOfferController,
  getAllOfferedProduct,
} = require("../controllers/offerController");

const router = express.Router();

//create offer product
router.post("/create-offer", createOfferController);

//Get all the product
router.get("/get-all-offer-product", getAllOfferedProduct);
module.exports = router;
