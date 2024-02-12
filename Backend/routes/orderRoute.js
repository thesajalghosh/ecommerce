const express = require("express");
const { OrderPlaceController } = require("../controllers/orderController");

const router = express.Router();

router.post("/order-place", OrderPlaceController);

module.exports = router;
