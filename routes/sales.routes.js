const express = require('express');

const router = express.Router();

const { salesController } = require('../controllers/salesController');

router.post('/', salesController.addSale);
router.get('/:id', salesController.getById);
router.get('/', salesController.getAll);

module.exports = router;
