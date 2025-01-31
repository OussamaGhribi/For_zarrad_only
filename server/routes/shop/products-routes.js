const express = require("express");

const { 
  getFilteredProducts,
  getProductDetails,
  updateProductStock,
} = require("../../controllers/shop/products-controller");

const router = express.Router();

router.get("/get", getFilteredProducts);

router.get("/get/:id", getProductDetails);

router.put("/update-stock/:productId", updateProductStock); 

module.exports = router;
