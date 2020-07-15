module.exports = (err, req, res, next) => {
  const newStatus = err.statusCode || 500;
  let { message } = err;
  // if (err.code === 12000) {
  //   console.log('ошибка работает');
  //   status = 409;
  //   message = 'пользователь с такой почтой уже существует';
  // } else {
  if (err.name === 'ValidationError' || err.joi) {
    return res.status(400).send(`validation error: ${err.message}`);
  }
  if (newStatus === 500) {
    console.error(err.stack || err);
    message = 'unexpected error';
  }

  res
    .status(newStatus)
    .json({
      message,
    });

  return next();
};
