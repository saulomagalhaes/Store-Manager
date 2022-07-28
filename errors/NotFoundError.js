const throwNotFoundError = (message) => {
  const error = new Error(message);
  error.name = 'NotFoundError';
  error.code = 404;
  throw error;
};

module.exports = { throwNotFoundError };
