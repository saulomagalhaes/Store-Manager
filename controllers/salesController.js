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
    // #swagger.tags = ['Sales']
    // #swagger.description = 'Endpoint para obter uma venda específica.'
    // #swagger.parameters['id'] = { description: 'ID da venda.' }
    /* #swagger.responses[200] = {
                schema: { $ref: "#/definitions/SaleID" },
                description: 'Vendas Encontradas.'
          } */
    /* #swagger.responses[404] = {
               description: 'Venda não encontrada.'
     } */
    const sales = await salesService.getById(req.params.id);
    res.status(200).json(sales);
  },
  async deleteById(req, res) {
    // #swagger.tags = ['Sales']
    // #swagger.description = 'Endpoint para deletar uma venda.'
    // #swagger.parameters['id'] = { description: 'ID da venda.' }
    /* #swagger.responses[204] = {
                description: 'Venda Deletada.'
          } */
    /* #swagger.responses[404] = {
               description: 'Venda não encontrada.'
     } */
    const { id } = req.params;
    await salesService.deleteById(id);
    res.sendStatus(204);
  },
  async updateById(req, res) {
    // #swagger.tags = ['Sales']
    // #swagger.description = 'Endpoint para atualizar uma venda.'
    // #swagger.parameters['id'] = { description: 'ID da venda.' }
    /* #swagger.parameters['Sale'] = {
                in: 'body',
                description: 'Informações da venda.',
                required: true,
                schema: { $ref: "#/definitions/addSale" }
          } */
    /* #swagger.responses[200] = {
                schema: { $ref: "#/definitions/resUpdateSale" },
                description: 'Venda Atualizada.'
          } */
    /* #swagger.responses[404] = {
               description: 'Venda não encontrada.'
     } */
    const { id } = req.params;
    await salesService.validateProductAndQuantity(req.body);
    const product = await salesService.updateById(id, req.body);
    res.status(200).json(product);
  },
};
module.exports = { salesController };
