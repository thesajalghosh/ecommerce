const express = require("express");
const {
  OrderPlaceController,
  getsingleCidOrder,
  getallOrderOnOneStatus,
  orderStatusChange,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/order-place", OrderPlaceController);

router.post("/get-single-cid-order", getsingleCidOrder);

router.post("/get-one-status-order", getallOrderOnOneStatus);

router.put("/change-order-status", orderStatusChange);

module.exports = router;
