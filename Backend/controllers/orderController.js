const OrderModel = require("../models/orderModel");

const OrderPlaceController = async (req, res) => {
  try {
    const { cid, pid, sloc, totp, paymet, paysat } = req.body;

    console.log(req.body);

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

module.exports = {
  OrderPlaceController,
};
