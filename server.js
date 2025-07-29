const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { sequelize } = require("./models"); // Load all models + associations

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");


const app = express();
app.use(cors());
app.use(express.json());

app.use('/images', express.static('public/images'));
app.use("/api", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
  res.send("API is running ✅");
});

sequelize.sync().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
  });
});
