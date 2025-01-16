const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = 'data:' + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);

        res.json({
            success: true,
            result,
        });
    } catch (error) {
        console.error('Error during image upload:', error);
        res.status(500).json({
            success: false,
            message: "An error occurred during image upload"
        });
    }
};

// Add product
const addProduct = async (req, res) => {
    try {
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
        const newlyCreatedProduct = new Product({
            image, title, description, category, brand, price, salePrice, totalStock
        });
        await newlyCreatedProduct.save();
        res.status(201).json({
            success: true,
            data: newlyCreatedProduct
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({
            success: false,
            message: "An error occurred while adding the product"
        });
    }
};

// Fetch all products
const fetchAllProducts = async (req, res) => {
    try {
        const listOfProducts = await Product.find({});
        res.status(200).json({
            success: true,
            data: listOfProducts
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching products"
        });
    }
};

// Edit product
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

        let findProduct = await Product.findById(id);
        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.price = price === 0 ? '' : 0 || findProduct.price;
        findProduct.totalStock = totalStock || findProduct.totalStock;
        
        if (image) {
            findProduct.image = image;
        }
        findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice;

        await findProduct.save();
        res.status(200).json({
            success: true,
            data: findProduct
        });
    } catch (error) {
        console.error('Error editing product:', error);
        res.status(500).json({
            success: false,
            message: "An error occurred while editing the product"
        });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the product"
        });
    }
};

module.exports = { handleImageUpload, addProduct, editProduct, fetchAllProducts, deleteProduct };
