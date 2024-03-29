const orderModel = require("../models/orderModel");
const OrderModel = require("../models/orderModel");
const { connectSocket } = require("../socket.js");

const orderPlaceController = async (req, res) => {
  try {
    console.log(req.user);
    const orderProduct = new OrderModel({ ...req.body, orsat: 1 });

    await orderProduct.save();

    res.status(200).send({
      success: true,
      message: "successfully order is placed",
      orderProduct,
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

const orderStatusChange = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await orderModel.updateOne(
      { _id: id },
      { $inc: { orsat: 1 } },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "successfully update the stage",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in status change",
      error,
    });
  }
};
const orderCancelStatusChange = async (req, res) => {
  try {
    let socket = connectSocket();

    console.log(req.user, "recived");
    const userId = req.user._id;

    const { id } = req.body;

    const result = await orderModel.findByIdAndUpdate(
      { _id: id },
      { $set: { orsat: 5 } },
      { new: true }
    );
    socket.to(userId).emit("cancel", result);
    res.status(200).send({
      success: true,
      message: "successfully cancel the order",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in cancel product api",
    });
  }
};

module.exports = {
  orderPlaceController,
  getsingleCidOrder,
  getallOrderOnOneStatus,
  orderStatusChange,
  orderCancelStatusChange,
};
