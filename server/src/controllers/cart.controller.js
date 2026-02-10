const Cart = require("../models/cart.model");

const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "userId and productId required" });
    }

    let cart = await Cart.findOne({ user: userId });

    // 🟢 If cart exists
    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // product already in cart → quantity +1
        cart.items[itemIndex].quantity += 1;
      } else {
        // new product
        cart.items.push({ productId, quantity: 1 });
      }

      await cart.save();
      return res.status(200).json(cart);
    }

    // 🟢 If cart does not exist
    cart = new Cart({
      user: userId,
      items: [{ productId, quantity: 1 }],
    });

    await cart.save();
    res.status(201).json(cart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.body; // ❗ use params for GET

    if (!userId) {
      return res.status(400).json({ message: "userId required" });
    }

    const cart = await Cart.findOne({ user: userId })
      .populate("items.productId"); // 🔥 key line

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({
        message: "Cart is empty",
        cart: { items: [] },
      });
    }

    res.status(200).json({
      message: "Cart fetched successfully",
      cart,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const updateCart = async (req, res) => {
  try {
    const { cartItemId, quantity } = req.body;

    // ❗ validation
    if (!cartItemId || quantity < 1) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const cart = await Cart.findOneAndUpdate(
      { "items._id": cartItemId },
      { $set: { "items.$.quantity": quantity } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({
      message: "Cart updated successfully",
      cart,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.body;

    if (!cartItemId) {
      return res.status(400).json({ message: "cartItemId required" });
    }

    const cart = await Cart.findOneAndUpdate(
      { "items._id": cartItemId },
      { $pull: { items: { _id: cartItemId } } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({
      message: "Item removed from cart",
      cart,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { addToCart, getCart, removeFromCart, updateCart };