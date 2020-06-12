const bcrypt = require('bcryptjs');
const Users = require('../models/user');

const signUp = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => Users.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      const userNoPass = user;
      userNoPass.password = '******';
      res.send({ data: userNoPass });
    })
    .catch(next);
};

module.exports = {
  signUp,
};
