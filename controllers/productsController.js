const { productsService } = require('../services/productsService');

const productsController = {
  async getAll(_req, res) {
    const products = await productsService.getAll();
    res.status(200).json(products);
  },
  async getById(req, res) {
    const product = await productsService.getById(req.params.id);
    res.status(200).json(product);
  },
};

module.exports = { productsController };