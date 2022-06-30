const express = require('express');

const router = express.Router();

const { salesController } = require('../controllers/salesController');

router.post('/', salesController.addSale);

module.exports = router;
