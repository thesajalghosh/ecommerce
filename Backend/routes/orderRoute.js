const express = require("express");
const {
  OrderPlaceController,
  getsingleCidOrder,
  getallOrderOnOneStatus,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/order-place", OrderPlaceController);

router.post("/get-single-cid-order", getsingleCidOrder);

router.post("/get-one-status-order", getallOrderOnOneStatus);

module.exports = router;
