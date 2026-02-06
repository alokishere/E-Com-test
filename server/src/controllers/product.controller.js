const Product = require("../models/product.model");

//create product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, image, category, isFeatured } = req.body;
        const product = await Product.create({ name, description, price, stock, image, category, isFeatured });
        res.status(201).json({ 
            message: "Product created successfully",
            product
         });
    } catch (error) {
        res.status(500).json({" Error at product creation" : error.message });
    }
}

//get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if(!products){
            return res.status(404).json({ message: "Products not found" });
        }
        res.status(200).json({
            message: "Products fetched successfully",
            products
        });
    } catch (error) {
        res.status(500).json({ " Error at product fetching" : error.message });
    }
}

//get product by id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({
            message: "Product fetched successfully",
            product
        });
    } catch (error) {
        res.status(500).json({ " Error at product fetching" : error.message });
    }
}

//update product
const updateProduct = async (req, res) => {
    try {
        const { name, description, price, stock, image, category, isFeatured } = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, { name, description, price, stock, image, category, isFeatured }, { new: true });
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        res.status(500).json({ " Error at product updating" : error.message });
    }
}

//delete product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({
            message: "Product deleted successfully",
            product
        });
    } catch (error) {
        res.status(500).json({ " Error at product deleting" : error.message });
    }
}

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };