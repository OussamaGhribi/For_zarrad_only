const Product = require("../../models/Product");

// Controller for getting filtered products
const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;
    let filters = {};
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }
    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occurred!",
    });
  }
};

// Controller for getting product details
const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occurred!",
    });
  }
};

// Controller for updating product stock
const updateProductStock = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return console.log("product not found in product-controller") || res.status(404).json({ success: false, message: 'Product not found' });
      
    }
    if(quantity > product.totalStock || product.totalStock === 0) {
      return console.log("not enaugh product-controller") || res.status(400).json({ success: false, message: 'Not enough stock available' });
    }
    product.totalStock -= quantity;
    await product.save();
    res.json({
      success: true,
      message: 'Product stock updated successfully',
      product,
    });
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating stock',
    });
    console.log("error updating product");
  }
};

module.exports = { 
  getFilteredProducts,
  getProductDetails,
  updateProductStock,
};
