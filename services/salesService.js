const Joi = require('joi');
const { salesModel } = require('../models/salesModel');

const { runSchema } = require('../middlewares/validators');
const message = require('../errors/messages');
const { throwNotFoundError } = require('../errors/NotFoundError');

const salesService = {
  validateProductAndQuantity: runSchema(
    Joi.array().items(
      Joi.object({
        productId: Joi.number().required().messages(message.productId),
        quantity: Joi.number().min(1).required().messages(message.quantity),
      }),
    ),
  ),
  async addSale(sales) {
    const productsIds = sales.map((product) => product.productId);
    const existsProducts = await salesModel.existsProduct(productsIds);
    if (!existsProducts.length) throwNotFoundError('Product not found');
    if (existsProducts.length !== productsIds.length) throwNotFoundError('Product not found');

    const saleId = await salesModel.addSale();

    await salesModel.addSalesProducts(saleId, sales);

    const result = {
      id: saleId,
      itemsSold: sales,
    };
    return result;
  },
};
module.exports = { salesService };