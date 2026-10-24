
const Joi = require("joi");

const createEmployeeSchema = Joi.object({
  fullName: Joi.string().trim().min(3).max(80).required(),
  email: Joi.string().email().required(),
  department: Joi.string().trim().required(),
  jobTitle: Joi.string().trim().required(),
});

const updateEmployeeSchema = Joi.object({
  fullName: Joi.string().trim().min(3).max(80),
  email: Joi.string().email(),
  department: Joi.string().trim(),
  jobTitle: Joi.string().trim(),
  employmentStatus: Joi.string().valid("ACTIVE", "INACTIVE"),
}).min(1);

module.exports = {
  createEmployeeSchema,
  updateEmployeeSchema,
};
