const express = require("express");
const { searchProducts } = require("../../controllers/shop/search-controller");

const router = express.Router();

// Route to search for products
router.get("/", searchProducts);

module.exports = router;
