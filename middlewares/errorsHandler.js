module.exports = (err, req, res, next) => {
  const newStatus = err.statusCode || 500;
  let { message } = err;
  if (err.name === 'ValidationError' || err.joi) {
    return res.status(400).send(`validation error: ${err.message}`);
  }
  if (newStatus === 500) {
    // отслеживание ошибок в консоли
    // console.error(err.stack || err);
    message = 'unexpected error';
  }

  res
    .status(newStatus)
    .json({
      message,
    });

  return next();
};
