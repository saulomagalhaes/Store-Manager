const runSchema = (schema) => async (unknown) => {
  const { error, value } = schema.validate(unknown);
  if (error) {
    if (error.details[0].type === 'string.min') {
      error.code = 422;
      throw error;
    }
    if (error.details[0].type === 'any.required') {
      error.code = 400;
      throw error;
    }
    return;
  }

  return value;
};

module.exports = { runSchema };
