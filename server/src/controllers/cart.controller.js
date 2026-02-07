const Cart = require("../models/cart.model");

const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if(!userId || !productId || !quantity){
            return res.status(400).json({ message: "All fields are required" });
        }
        const cart = await Cart.findOne({ user: userId });
        if (cart) {
            cart.items.push({ productId, quantity });
            await cart.save();
            res.status(200).json({ message: "Item added to cart" });
        } else {
            const newCart = new Cart({ user: userId, items: [{ productId, quantity }] });
            await newCart.save();
            res.status(200).json({ message: "Item added to cart" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const cart = await Cart.findOne({ user: userId });
        if(!cart){
            return res.status(404).json({ message: "Cart not found may be you have not added any product to cart" });
        }
        res.status(200).json({
            message: "Cart fetched successfully",
            cart
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body; 
        const cart = await Cart.findOne({ user: userId });
        if (cart) {
            cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
            await cart.save();
            res.status(200).json({ message: "Item removed from cart", cart });
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { addToCart, getCart, removeFromCart };