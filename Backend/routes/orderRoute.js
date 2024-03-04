const express = require("express");
const {
  orderPlaceController,
  getsingleCidOrder,
  getallOrderOnOneStatus,
  orderStatusChange,
  orderCancelStatusChange,
} = require("../controllers/orderController");
const { requireSignIn } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/order-place", requireSignIn, orderPlaceController);

router.post("/get-single-cid-order", getsingleCidOrder);

router.post("/get-one-status-order", requireSignIn, getallOrderOnOneStatus);

router.put("/change-order-status", requireSignIn, orderStatusChange);

router.put("/cancel-status", requireSignIn, orderCancelStatusChange);

module.exports = router;
