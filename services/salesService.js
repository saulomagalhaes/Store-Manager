const Joi = require('joi');
const { salesModel } = require('../models/salesModel');

const { runSchema } = require('../utils/validators');
const message = require('../errors/messages');
const { throwNotFoundError } = require('../errors/NotFoundError');

const salesService = {
  validateProductAndQuantity: runSchema(
    Joi.array().items(
      Joi.object({
        productId: Joi.number().min(1).required().messages(message.productId),
        quantity: Joi.number().min(1).required().messages(message.quantity),
      }),
    ),
  ),
  async addSale(sales) {
    const productsIds = sales.map((product) => product.productId);
    const existsProducts = await salesModel.existsProduct(productsIds);
    if (!existsProducts.length) throwNotFoundError('Product not found');
    if (existsProducts.length !== productsIds.length) {
      throwNotFoundError('Product not found');
    }

    const saleId = await salesModel.addSale();

    await salesModel.addSalesProducts(saleId, sales);

    const result = {
      id: saleId,
      itemsSold: sales,
    };
    return result;
  },
  async getAll() {
    const sales = await salesModel.getAll();
    return sales;
  },
  async getById(id) {
    const sales = await salesModel.getById(id);
    if (sales.length === 0) throwNotFoundError('Sale not found');
    return sales;
  },
  async deleteById(id) {
    const product = await salesModel.deleteById(id);
    if (!product) throwNotFoundError('Sale not found');
    return true;
  },
  async updateById(saleId, sales) {
    const productsIds = sales.map((product) => product.productId);
    const existsProducts = await salesModel.existsProduct(productsIds);
    if (!existsProducts.length) throwNotFoundError('Product not found');
    if (existsProducts.length !== productsIds.length) {
      throwNotFoundError('Product not found');
    }
    const result = await Promise.all(
      sales.map(({ productId, quantity }) =>
        salesModel.updateById(saleId, productId, quantity)),
    );
    if (result.includes(false)) throwNotFoundError('Sale not found');
    return {
      saleId,
      itemsUpdated: sales,
    };
  },
};
module.exports = { salesService };
