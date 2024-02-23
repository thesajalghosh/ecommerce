const orderModel = require("../models/orderModel");
const OrderModel = require("../models/orderModel");

const OrderPlaceController = async (req, res) => {
  try {
    const orderProduct = new OrderModel({ ...req.body, orsat: 1 });

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
    const { cid } = req.body;
    const orders = await orderModel.find({ cid: cid }).populate("pid");

    res.status(200).send({
      success: true,
      message: "succefully getting single customet order",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "error in getting single customer order details",
      error,
    });
  }
};

const getallOrderOnOneStatus = async (req, res) => {
  try {
    const { orsat } = req.body;
    console.log(orsat);
    const orders = await orderModel.find({ orsat: orsat }).populate("pid");
    res.status(200).send({
      success: true,
      message: "success fully getting the orders",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "error in getting one status order",
      error,
    });
  }
};

module.exports = {
  OrderPlaceController,
  getsingleCidOrder,
  getallOrderOnOneStatus,
};
