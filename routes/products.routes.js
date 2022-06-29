const express = require('express');

const router = express.Router();

const { productsController } = require('../controllers/productsController');

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/', productsController.create);
module.exports = router;
