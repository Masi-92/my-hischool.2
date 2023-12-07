import Joi from "joi";

const passwordSchema = Joi.string().min(6);

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: passwordSchema.required(),
});