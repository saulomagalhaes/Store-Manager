const Joi = require('joi');

const { productsModel } = require('../models/productsModel');
const { throwNotFoundError } = require('../errors/NotFoundError');
const { runSchema } = require('../utils/validators');

const productsService = {
  validateCreateProduct: runSchema(
    Joi.object({
      name: Joi.string().min(5).required(),
    }),
  ),
  validateParamsCep: runSchema(
    Joi.object({
      cep: Joi.string()
        .regex(/^\d{5}-?\d{3}$/)
        .required(),
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
};
module.exports = { productsService };
