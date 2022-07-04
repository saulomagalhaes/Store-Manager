const errorHandler = (err, _req, res, _next) => {
  const { name, message, code } = err;
  switch (name) {
    case 'ValidationError':
      res.status(code).json({ message });
      break;
    case 'NotFoundError':
      res.status(code).json({ message });
      break;
    default:
      console.warn(err);
      res.sendStatus(500);
  }
};
module.exports = { errorHandler };