const { salesService } = require('../services/salesService');

const salesController = {
  async addSale(req, res) {
    await salesService.validateProductAndQuantity(req.body);
    const sale = await salesService.addSale(req.body);

    res.status(201).json(sale);
  },
  async getAll(_req, res) {
    const sales = await salesService.getAll();

    res.status(200).json(sales);
  },
  async getById(req, res) {
    const sales = await salesService.getById(req.params.id);

    res.status(200).json(sales);
  },
  async deleteById(req, res) {
    const { id } = req.params;
    await salesService.deleteById(id);
    res.sendStatus(204);
  },
};
module.exports = { salesController };