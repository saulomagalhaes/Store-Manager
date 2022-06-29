const { productsModel } = require('../models/productsModel');
const { throwNotFoundError } = require('../errors/NotFoundError');

const productsService = {
  async getAll() {
    const products = await productsModel.getAll();
    return products;
  },
  async getById(id) {
    const product = await productsModel.getById(id);
    if (!product) throwNotFoundError('Product not found');
    return product;
  },
};
module.exports = { productsService };
