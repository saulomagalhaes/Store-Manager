const express = require('express');

const router = express.Router();

const { productsController } = require('../controllers/productsController');

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);

module.exports = router;
