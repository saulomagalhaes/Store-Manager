const { salesService } = require('../services/salesService');

const salesController = {
  async addSale(req, res) {
    await salesService.validateProductAndQuantity(req.body);
    const sales = await salesService.addSale(req.body);
    
    res.status(201).json(sales);
  },
};
module.exports = { salesController };