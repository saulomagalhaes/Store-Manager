const express = require('express');

const router = express.Router();

const productsRoute = require('./products.routes');

router.use('/products', productsRoute);

module.exports = router;
