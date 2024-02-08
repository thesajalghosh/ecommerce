const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  orderItem: {
    type: Array,
    required: true,
  },
  shippingLocation: {
    type: String,
    required: true,
  },
  totalPrice: {
    typeof: Number,
    required: true,
  },
});
