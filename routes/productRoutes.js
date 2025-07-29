const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly'); // optional

router.post('/products', auth, adminOnly, productController.addProduct);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', auth, adminOnly, productController.updateProduct);
router.delete('/products/:id', auth, adminOnly, productController.deleteProduct);

module.exports = router;
