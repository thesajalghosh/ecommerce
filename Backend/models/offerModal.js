const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  offer: {
    type: Array,
    required: true,
  },
  extime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("offer", OfferSchema);
