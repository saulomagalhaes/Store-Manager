const Joi = require('joi');

const { productsModel } = require('../models/productsModel');
const { throwNotFoundError } = require('../errors/NotFoundError');
const { runSchema } = require('../utils/validators');

const productsService = {
  validateNameProduct: runSchema(
    Joi.object({
      name: Joi.string().min(5).required(),
    }),
  ),
  async getAll() {
    const products = await productsModel.getAll();
    return products;
  },
  async getById(id) {
    const product = await productsModel.getById(id);
    if (!product) throwNotFoundError('Product not found');
    return product;
  },
  async create(name) {
    const productId = await productsModel.create(name);
    return { id: productId, name };
  },
  async updateById(id, name) {
    const product = await productsModel.updateById(id, name);
    if (!product) throwNotFoundError('Product not found');
    return { id, name };
  },
  async deleteById(id) {
    const product = await productsModel.deleteById(id);
    if (!product) throwNotFoundError('Product not found');
    return true;
  },
  async searchByName(name) {
    const products = name === ''
      ? await productsModel.getAll()
      : await productsModel.searchByName(name);
    return products;
  },
};
module.exports = { productsService };
