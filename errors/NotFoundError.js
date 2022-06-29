const throwNotFoundError = (message) => {
  const error = new Error(message);
  error.name = 'NotFoundError';
  throw error;
};

// class NotFoundError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = 'NotFoundError';
//   }
// }

module.exports = { throwNotFoundError };
