const Product = require('../model/productModel');

const addProduct = async (req, res) => {
    const {
        link,
        title,
        price,
        image
    } = req.body;

    const product = new Product({
        videoId: req.params.id,
        link: link,
        title: title,
        price: price,
        image: image
    });

    try {
        const productToSave = await product.save();
        res.status(200).json({
            message: 'Product saved successfully',
            comment: productToSave
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const getProduct = async (req, res) => {
    try {
        const products = await Product.find({
            videoId: req.params.id
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addProduct,
    getProduct
};