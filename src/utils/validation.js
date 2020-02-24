const Joi = require('@hapi/joi');

const registerValidation = data => {
  const schema = Joi.object().keys({
    username: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .email({ tlds: { allow: false } }),
    password: Joi.string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  });
  return schema.validate(data);
};

const updateInfoValidation = data => {
  const schema = Joi.object().keys({
    newEmail: Joi.string()
      .email({ tlds: { allow: true } }),
    newPassword: Joi.string()
      .min(5)
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .required()
  });
  return schema.validate(data);
};

module.exports = { registerValidation, updateInfoValidation };
