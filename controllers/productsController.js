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
  async create(req, res) {
    const { name } = req.body;
    await productsService.validateNameProduct(req.body);
    const product = await productsService.create(name);
    res.status(201).json(product);
  },
  async updateById(req, res) {
    const { id } = req.params;
    const { name } = await productsService.validateNameProduct(req.body);
    const product = await productsService.updateById(id, name);
    res.status(200).json(product);
  },
  async deleteById(req, res) {
    const { id } = req.params;
    await productsService.deleteById(id);
    res.sendStatus(204);
  },
  async searchByName(req, res) {
    const { q } = req.query;
    const products = await productsService.searchByName(q);
    res.status(200).json(products);
  },
};

module.exports = { productsController };
