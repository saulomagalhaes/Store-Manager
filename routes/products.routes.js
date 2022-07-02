const express = require('express');

const router = express.Router();

const { productsController } = require('../controllers/productsController');

router.get('/', productsController.getAll);
router.post('/', productsController.create);
router.get('/:id', productsController.getById);
router.put('/:id', productsController.updateById);
router.delete('/:id', productsController.deleteById);
module.exports = router;
