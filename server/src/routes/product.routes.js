const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

//create product
router.post("/createproduct", createProduct);

//get all products
router.get("/getallproducts", getAllProducts);

//get product by id route is http://localhost:3000/api/product/getproductbyid/68e4691379997f47c95d5051
router.get("/getproductbyid/:id", getProductById);

//update product route is http://localhost:3000/api/product/updateproduct/68e4691379997f47c95d5051
router.put("/updateproduct/:id", updateProduct);

//delete product route is http://localhost:3000/api/product/deleteproduct/68e4691379997f47c95d5051
router.delete("/deleteproduct/:id", deleteProduct);

module.exports = router;
