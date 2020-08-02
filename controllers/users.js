const NotFoundError = require('../errors/not-found-error');
const Users = require('../models/user');

const getUser = (req, res, next) => {
  Users.findById(req.user._id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

const findUser = (req, res, next) => {
  Users.findById(req.params.id)
    .then((user) => { if (user) { res.status(200).send({ data: user }); } else { next(new NotFoundError('Нет пользователя с таким id')); } })
    .catch(next);
};

const logout = (req, res) => {
  res.cookie('jwt', '', {
    maxAge: 3600000 * 24 * 7,
    httpOnly: true,
    domain: '',
    // sameSite: 'none',
    // secure: true,
  }).send({ message: 'Вы успешно вышли из профиля' });
};

module.exports = {
  findUser,
  getUser,
  logout,
};
