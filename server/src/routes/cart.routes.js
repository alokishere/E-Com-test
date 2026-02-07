const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cart.controller");

router.post("/add", addToCart);
router.post("/get", getCart);
router.post("/remove", removeFromCart);

module.exports = router;
