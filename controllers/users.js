const NotFoundError = require('../errors/not-found-error');
const Users = require('../models/user');

const getUsers = (req, res, next) => {
  Users.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

// const findUser = (req, res, next) => {
//   Users.findById(req.params.id)
//     .then((user) => {
//       if (user) {
//         res.send({ data: user });
//       }
//       next(new NotFoundError('Нет пользователя с таким id'));
//     })
//     .catch(next);
// };

const findUser = (req, res, next) => {
  Users.findById(req.params.id)
    .then((user) => { if (user) { res.status(200).send({ data: user }); } else { next(new NotFoundError('Нет пользователя с таким id')); } })
    .catch(next);
};

module.exports = {
  findUser,
  getUsers,
};
