const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
} = require("../controllers/cart.controller");

router.post("/add", addToCart);
router.post("/get", getCart);
router.patch("/update", updateCart); // ✅ use patch for updates
router.delete("/remove", removeFromCart);

module.exports = router;
