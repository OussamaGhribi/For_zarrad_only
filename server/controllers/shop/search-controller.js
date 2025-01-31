const Product = require("../../models/Product"); // Adjust path if needed

// Search for products based on query
const searchProducts = async (req, res) => {
  try {
    const { query } = req.query; // Extract search query from request

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Search in title, description, category, and brand (case-insensitive)
    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
      ],
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error searching for products", error });
  }
};

module.exports = { searchProducts };
