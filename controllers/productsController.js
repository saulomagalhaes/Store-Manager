const { productsService } = require('../services/productsService');

const productsController = {
  async getAll(_req, res) {
    // #swagger.tags = ['Products']
    // #swagger.description = 'Endpoint para obter todos os produtos.'
    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/Products" },
               description: 'Produtos Encontrados.'
        } */
    const products = await productsService.getAll();
    res.status(200).json(products);
  },
  async getById(req, res) {
    // #swagger.tags = ['Products']
    // #swagger.description = 'Endpoint para obter um produto específico.'
    // #swagger.parameters['id'] = { description: 'ID do produto.' }
    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/Product" },
               description: 'Produtos Encontrados.'
        } */
    /* #swagger.responses[404] = {
               description: 'Produto não encontrado.'
     } */
    const product = await productsService.getById(req.params.id);
    res.status(200).json(product);
  },
  async create(req, res) {
    // #swagger.tags = ['Products']
    // #swagger.description = 'Endpoint para criação de um produto.'
    /* #swagger.parameters['Product'] = {
               in: 'body',
               description: 'Informações do produto.',
               required: true,
               schema: { $ref: "#/definitions/AddProducts" }
        } */
    /* #swagger.responses[201] = {
               schema: { $ref: "#/definitions/resAddProducts" },
               description: 'Produto Criado.'
        } */
    const { name } = req.body;
    await productsService.validateNameProduct(req.body);
    const product = await productsService.create(name);
    res.status(201).json(product);
  },
  async updateById(req, res) {
    // #swagger.tags = ['Products']
    // #swagger.description = 'Endpoint para atualizar um produto.'
    // #swagger.parameters['id'] = { description: 'ID do produto.' }
    /* #swagger.parameters['Product'] = {
               in: 'body',
               description: 'Informações do produto.',
               required: true,
               schema: { $ref: "#/definitions/AddProducts" }
        } */
    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/resAddProducts" },
               description: 'Produto Atualizado.'
        } */
    /* #swagger.responses[404] = {
               description: 'Produto não encontrado.'
     } */
    const { id } = req.params;
    const { name } = await productsService.validateNameProduct(req.body);
    const product = await productsService.updateById(id, name);
    res.status(200).json(product);
  },
  async deleteById(req, res) {
    // #swagger.tags = ['Products']
    // #swagger.description = 'Endpoint para deletar um produto.'
    // #swagger.parameters['id'] = { description: 'ID do produto.' }
    /* #swagger.responses[204] = {
               description: 'Produto Deletado.'
        } */
    /* #swagger.responses[404] = {
               description: 'Produto não encontrado.'
     } */
    const { id } = req.params;
    await productsService.deleteById(id);
    res.sendStatus(204);
  },
  async searchByName(req, res) {
    // #swagger.tags = ['Products']
    // #swagger.description = 'Endpoint para buscar um produto.'
    /* #swagger.parameters['name'] = {
               in: 'query',
               description: 'Nome do Produto.',
        } */
    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/Products" },
               description: 'Produto Encontrado.'
        } */
    const { q } = req.query;
    const products = await productsService.searchByName(q);
    res.status(200).json(products);
  },
};

module.exports = { productsController };
