const Joi = require('@hapi/joi');

const emailValidation = data => {
  const schema = Joi.object().keys({
    username: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .required()
  });
  return schema.validate(data);
};

const updateInfoValidation = data => {
  const schema = Joi.object().keys({
    newEmail: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    newPassword: Joi.string()
      .min(5)
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .required()
  });
  return schema.validate(data);
};

module.exports = { emailValidation, updateInfoValidation };
