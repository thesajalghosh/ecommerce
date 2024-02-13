const orderModel = require("../models/orderModel");
const OrderModel = require("../models/orderModel");

const OrderPlaceController = async (req, res) => {
  try {
    const { cid, pid, sloc, totp, paymet, paysat } = req.body;

    console.log(req.body);

    const orderProduct = new OrderModel(req.body);

    await orderProduct.save();

    res.status(201).send({
      success: true,
      message: "successfully order is placed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in createing product",
    });
  }
};

const getsingleCidOrder = async (req, res) => {
  try {
    const orders = orderModel.findOne({ cid: req.body });

    res.status(200).send({
      success: true,
      message: "succefully getting single customet order",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "error in geting single customer order details",
      error,
    });
  }
};

module.exports = {
  OrderPlaceController,
  getsingleCidOrder,
};
