const bcrypt = require('bcryptjs');
const Users = require('../models/user');
const ConflictError = require('../errors/conflict-error');

const signUp = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => Users.create({
      name, email, password: hash,
    }))
    .then((user) => {
      const userNoPass = user;
      userNoPass.password = '******';
      res.send({ data: userNoPass });
      // удалить
      // console.log('работаю...');
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с такой почтой уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  signUp,
};
