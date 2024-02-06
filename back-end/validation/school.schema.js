import Joi from "joi";

export const createSchoolSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  tel: Joi.string().required(),
  email: Joi.string().required(),
  managerEmail: Joi.string().required(),
  managerPassword: Joi.string().required(),
  managerFullName: Joi.string().required(),
  managerPhone: Joi.string().required(),
  managerImage: Joi.string(),
});


export const updateSchoolSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  tel: Joi.string().required(),
  email: Joi.string().required(),
  managerEmail: Joi.string().required(),
  managerPassword: Joi.string().allow(""),
  managerFullName: Joi.string().required(),
  managerPhone: Joi.string().required(),
  managerImage: Joi.string(),
});
