const express = require("express");
const multer = require("multer");
const {
  createOfferController,
  getAllOfferedProduct,
} = require("../controllers/offerController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  },
});

const upload = multer({ storage: storage });
//create offer product
router.post("/create-offer", upload.single("photo"), createOfferController);

//Get all the product
router.get("/get-all-offer-product", getAllOfferedProduct);
module.exports = router;
