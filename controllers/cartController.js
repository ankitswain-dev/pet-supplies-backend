// controllers/cartController.js
const { Cart, Product } = require("../models");

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if item already in cart → update quantity
    const existing = await Cart.findOne({ where: { userId, productId } });

    if (existing) {
      existing.quantity += quantity;
      await existing.save();
      return res.json({ message: "Cart updated", cart: existing });
    }

    // Else create new cart item
    const cartItem = await Cart.create({ userId, productId, quantity });
    res.status(201).json({ message: "Added to cart", cart: cartItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCartByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Product }],
    });

    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Cart.destroy({ where: { id } });

    if (deleted) {
      res.json({ message: "Item removed from cart" });
    } else {
      res.status(404).json({ message: "Cart item not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    await Cart.destroy({ where: { userId } });
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear cart", error });
  }
};

