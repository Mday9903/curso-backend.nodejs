//Utilizamos Joi para verificacion de datos: (DTO's o schemas)

const Joi = require('joi');

const id = Joi.string().uuid(); //Validamos que nuestro id sea de tipo uuid.
const name = Joi.string()
  .pattern(/^[a-zA-Z0-9 ]+$/)
  .min(3)
  .max(15)
  .messages({
    'string.base': `" nombre "debe ser un tipo de 'texto'`,
    'string.empty': `"nombre "no puede ser un campo vacío`,
    'string.min': `"nombre" debe tener una longitud mínima de {#limit}`,
    'string.max': `"nombre" debe tener una longitud máxima de {#limit}`,
  }); //Que el nombre sea de tipo alfanumerico con espacios, mínimo 3 y máximo 15 caracteres.
const price = Joi.number().integer().min(10).messages({
  'number.base': `"precio" debe ser un tipo de 'número'`,
  'number.empty': `"precio" no puede ser un campo vacío`,
  'number.integer': `"precio" debe ser un número entero`,
  'number.min': `"precio" debe tener un valor mínimo de {#limit}`,
}
); //Que el precio sea de tipo integer y mínimo de 10 dolares.
const image = Joi.string().uri(); //Que la imagen sea de tipo uri.

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image,
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { getProductSchema, updateProductSchema, createProductSchema };
