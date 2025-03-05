const Order = require("../../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { userId, cartId, cartItems, addressInfo, paymentMethod, paymentStatus, totalAmount, paymentId, payerId } = req.body;

    const newOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus: "pending",
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId,
      payerId,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({message:"order is not placed", error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
