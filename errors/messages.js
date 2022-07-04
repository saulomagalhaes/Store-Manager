const message = {
  productId: {
    'any.required': '"productId" is required',
  },
  quantity: {
    'any.required': '"quantity" is required',
    'number.min': '"quantity" must be greater than or equal to 1',
  },
};

module.exports = message;
