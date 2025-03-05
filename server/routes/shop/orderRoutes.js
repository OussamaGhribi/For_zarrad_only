const express = require("express");
const { createOrder, getAllOrders } = require("../../controllers/shop/orderController");

const router = express.Router();

router.post("/create", createOrder); 
router.get("/getOrder", getAllOrders); 

module.exports = router;
