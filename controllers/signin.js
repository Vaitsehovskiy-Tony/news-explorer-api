const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const Users = require('../models/user');
const { JWT_SECRET } = require('../config');

const signIn = (req, res, next) => {
  const { email, password } = req.body;
  let user;

  Users.findOne({ email }).select('+password')
    .then((u) => {
      user = u;
      if (!u) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, u.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return jwt.sign(
        { _id: user.id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
    })
    .then((token) => {
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        domain: '',
        // sameSite: 'none',
        // secure: true,
      });
      res.json({ token });
    })
    .catch(next);
};

module.exports = {
  signIn,
};
