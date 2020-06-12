const validator = require('validator');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) { return validator.isEmail(v); },
      message: 'Неверный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Это обязательное поле'],
    minlength: [2, 'Должно быть от 2 до 30 символов'],
    maxlength: [30, 'Должно быть от 2 до 30 символов'],
  },
});

module.exports = mongoose.model('user', userSchema);
