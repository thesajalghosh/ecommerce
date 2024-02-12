const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  cid: {
    // customer id
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  pid: [{ type: Schema.Types.ObjectId, ref: "product" }], // order item
  sloc: {
    // shipping location
    type: String,
    required: true,
  },
  totp: {
    // total price
    type: Number,
    required: true,
  },
  paymet: {
    // payment method
    type: Number,
  },
  paysat: {
    // payment status
    type: Boolean, // Changed from 'true' to 'Boolean' assuming it's meant to be a boolean type
  },
});

module.exports = mongoose.model("order", OrderSchema);