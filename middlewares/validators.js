const runSchema = (schema) => async (unknown) => {
  const { error, value } = schema.validate(unknown);
  if (error) {
    switch (true) {
      case error.details[0].type === 'string.min'
        || error.details[0].type === 'number.min':
        error.code = 422;
        throw error;
      case error.details[0].type === 'any.required':
        error.code = 400;
        throw error;
      default:
    }
  }
  return value;
};

module.exports = { runSchema };

//   if (error) {
//     if (error.details[0].type === "string.min") {
//       error.code = 422;
//       throw error;

//     if (error.details[0].type === "number.min") {
//       error.code = 400;
//       throw error;
//     }
//     if (error.details[0].type === "any.required") {
//       error.code = 400;
//       throw error;
//     }
//     return;
//   }

//   return value;
// };
