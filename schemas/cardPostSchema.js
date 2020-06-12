const Joi = require('celebrate');

module.exports.cardPostSchema = {
  body: Joi.object().keys({
    keyword: Joi.string()
      .alphanum()
      .required(),
    title: Joi.string()
      .alphanum()
      .required(),
    text: Joi.string()
      .alphanum()
      .required(),
    date: Joi.string()
      .num()
      .required(),
    source: Joi.string()
      .alphanum()
      .required(),
    link: Joi.string()
      .regex(/(https?:\/\/)(www\.)?((\w+\.\w{2,})|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d{2,5})?.*#?/i)
      .required(),
    image: Joi.string()
      .regex(/(https?:\/\/)(www\.)?((\w+\.\w{2,})|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d{2,5})?.*#?/i)
      .required(),
  }),
};
