const Joi = require('@hapi/joi');

const emailValidation = data => {
  const schema = Joi.object().keys({
    username: Joi.string().min(3).required(),
    email: Joi.string().email({tlds: {allow: false}}).required(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(data);
}

module.exports = {emailValidation}