/* eslint-disable no-useless-escape */
const { Joi } = require('celebrate');

module.exports.signUpSchema = {
  body: Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .required()
      .min(2)
      .max(30),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2 }),
    password: Joi.string()
      .regex(/^[-_!@#%{}a-zA-Z0-9\]\[\\\?\^\$\.\|\*\+\)\(]{8,30}$/)
      .required()
      .min(6),
  }).unknown(true),
};
