import Joi from "@hapi/joi";

const productSchema = Joi.object({
  productName: Joi.string().required(),
  sku: Joi.string().required(),
  productType: Joi.string().required(),
  brand: Joi.string().required(),
  defaultPrice: Joi.number().required(),
  weight: Joi.number().required(),
  categories: Joi.string().required(),
  description: Joi.string().required(),
  visibility: Joi.boolean().required(),
  images: Joi.array().items(Joi.string().required()).required(),
});

export const productBodyValidate = (inputData) => {
  return productSchema.validate(inputData);
};