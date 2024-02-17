const express = require("express");
const {
  OrderPlaceController,
  getsingleCidOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/order-place", OrderPlaceController);

router.post("/get-single-cid-order", getsingleCidOrder);

module.exports = router;
