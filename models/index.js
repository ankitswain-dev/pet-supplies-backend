// models/index.js

const sequelize = require("../config/db");

// ✅ First, import models
const User = require("./user");
const Product = require("./product");
const Cart = require("./cart");

// ✅ Then define associations — AFTER importing models
User.hasMany(Cart, { foreignKey: "userId", onDelete: "CASCADE" });
Cart.belongsTo(User, { foreignKey: "userId" });

Product.hasMany(Cart, { foreignKey: "productId", onDelete: "CASCADE" });
Cart.belongsTo(Product, { foreignKey: "productId" });

// ✅ Export them
module.exports = {
  sequelize,
  User,
  Product,
  Cart
};
