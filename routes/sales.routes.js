const express = require('express');

const router = express.Router();

const { salesController } = require('../controllers/salesController');

router.post('/', salesController.addSale);
router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);
router.put('/:id', salesController.updateById);
router.delete('/:id', salesController.deleteById);

module.exports = router;
