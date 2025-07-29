const Product = require('../models/product');

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: "Error adding product" });
  }
};

// Get All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error("❌ Sequelize error:", err);  // 👈 Add this line
    res.status(500).json({ error: "Error fetching products" });
  }
};


// Get Single Product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.update(req.body, {
      where: { id: req.params.id }
    });
    res.json({ message: "Product updated", updated });
  } catch (err) {
    res.status(500).json({ error: "Error updating product" });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting product" });
  }
};
