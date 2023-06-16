const Joi = require("joi");

const customMessages = {
  "string.empty": "{#label} não pode estar vazio",
  "any.required": "{#label} é um campo obrigatório",
  "number.min": "{#label} deve ser maior ou igual a {#limit}",
  "number.max": "{#label} deve ser menor ou igual a {#limit}",
  "string.uri": "{#label} deve ser uma URL válida",
  "string.email": "{#label} deve ser um endereço de e-mail válido",
  "string.alphanum": "{#label} deve conter apenas caracteres alfanuméricos",
};

const joiOptions = {
  abortEarly: false,
  messages: customMessages,
};

const PropertyValidation = {
  createPropertySchema: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    propertyType: Joi.string().valid("Casa", "Apartamento", "Terreno").required(),
    bedrooms: Joi.number().integer().required(),
    bathrooms: Joi.number().integer().required(),
    price: Joi.number().min(0).required(),
    imageUrl: Joi.string().uri().required(),
  }).options(joiOptions),
};

module.exports = PropertyValidation;
