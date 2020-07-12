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
      console.log('работаю...');
    })
    .catch(next);
};

module.exports = {
  signUp,
};
