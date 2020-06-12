const mongoose = require('mongoose');
const validator = require('validator');

const articleModel = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Это обязательное поле'],
  },
  title: {
    type: String,
    required: [true, 'Это обязательное поле'],
  },
  text: {
    type: String,
    required: [true, 'Это обязательное поле'],
  },
  date: {
    type: Date,
    required: [true, 'Это обязательное поле'],
  },
  source: {
    type: String,
    required: [true, 'Это обязательное поле'],
  },
  link: {
    type: String,
    required: [true, 'Это обязательное поле'],
    validate: {
      validator(v) { return validator.isURL(v); },
      message: 'Здесь должна быть ссылка',
    },
  },
  image: {
    type: String,
    required: [true, 'Это обязательное поле'],
    validate: {
      validator(v) { return validator.isURL(v); },
      message: 'Здесь должна быть ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Это обязательное поле'],
    ref: 'user',
  },
});

module.exports = mongoose.model('article', articleModel);
