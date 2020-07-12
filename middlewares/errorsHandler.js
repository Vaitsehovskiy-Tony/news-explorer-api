module.exports = (err, req, res, next) => {
  let status;
  let { message } = err;
  if (err.code === 11000) {
    console.log('ошибка работает');
    status = 409;
    message = 'пользователь с такой почтой уже существует';
  } else {
    status = err.status || 500;
    if (err.name === 'ValidationError' || err.joi) {
      return res.status(400).send(`validation error: ${err.massage}`);
    }
    if (status === 500) {
      console.error(err.stack || err);
      message = 'unexpected error';
    }
  };

  return res.json({
    status,
    message,
    // это надо будет удалить
    stack: err.stack,
  });
};
