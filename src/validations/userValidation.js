const Joi = require('joi');

const customMessages = {
  'string.empty': '{#label} não pode estar vazio',
  'any.required': '{#label} é um campo obrigatório',
  'string.min': '{#label} deve ter pelo menos {#limit} caracteres',
  'string.email': '{#label} deve ser um endereço de e-mail válido',
};

const joiOptions = {
  abortEarly: false,
  messages: customMessages,
};

const registerSchema = Joi.object({
  username: Joi.string().required().min(3),
  password: Joi.string().required().min(6),
  email: Joi.string().required().email(), 
  email: Joi.string().email().required(),
  role: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  age: Joi.number().integer().min(18),
  address: Joi.string(),
  photo: Joi.string().allow(''), 

}).options(joiOptions);

module.exports = {
  registerSchema,
};
