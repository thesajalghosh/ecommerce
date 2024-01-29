const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  des: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  disp: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("offer", OfferSchema);
