const express = require('express');

const router = express.Router();

const { salesController } = require('../controllers/salesController');

router.get('/:id', salesController.getById);
router.get('/', salesController.getAll);
router.post('/', salesController.addSale);
router.put('/:id', salesController.updateById);
router.delete('/:id', salesController.deleteById);

module.exports = router;
