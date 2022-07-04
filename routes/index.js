const express = require('express');

const router = express.Router();

const productsRoute = require('./products.routes');
const salesRoute = require('./sales.routes');

router.use('/products', productsRoute);
router.use('/sales', salesRoute);

module.exports = router;
