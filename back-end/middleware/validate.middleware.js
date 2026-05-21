import Joi from "joi";

// for more info : https://www.npmjs.com/package/joi
export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  if (error) {
    const message = error.details.map((d) => d.message).join("; ");
    return res.status(400).send({ message });
  }
  req.body = value;
  next();
};
