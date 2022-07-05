const { salesService } = require('../services/salesService');

const salesController = {
  async addSale(req, res) {
    // #swagger.tags = ['Sales']
    // #swagger.description = 'Endpoint para criação de uma venda.'
    /* #swagger.parameters['Sale'] = {
                in: 'body',
                description: 'Informações da venda.',
                required: true,
                schema: { $ref: "#/definitions/addSale" }
          } */
    /* #swagger.responses[201] = {
                schema: { $ref: "#/definitions/resAddSale" },
                description: 'Venda Criada.'
          } */
    await salesService.validateProductAndQuantity(req.body);
    const sale = await salesService.addSale(req.body);
    res.status(201).json(sale);
  },
  async getAll(_req, res) {
    // #swagger.tags = ['Sales']
    // #swagger.description = 'Endpoint para obter todas as vendas.'
    /* #swagger.responses[200] = {
                schema: { $ref: "#/definitions/Sales" },
                description: 'Vendas Encontradas.'
          } */

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
  async updateById(req, res) {
    const { id } = req.params;
    await salesService.validateProductAndQuantity(req.body);
    const product = await salesService.updateById(id, req.body);
    res.status(200).json(product);
  },
};
module.exports = { salesController };
