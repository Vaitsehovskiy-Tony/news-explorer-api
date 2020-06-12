module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  let { message } = err;
  if (err.name === 'ValidationError' || err.joi) {
    return res.status(400).send(`validation error: ${err.massage}`);
  }
  if (status === 500) {
    console.error(err.stack || err);
    message = 'unexpected error';
  }
  return res.json({
    status,
    message,
    stack: err.stack,
  });
};
