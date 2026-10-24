const Joi = require("joi");

const objectIdPattern = /^[0-9a-fA-F]{24}$/;
const periodPattern = /^\d{4}-(0[1-9]|1[0-2])$/;

const createPayrollSchema = Joi.object({
  employee: Joi.string().pattern(objectIdPattern).required(),

  period: Joi.string().pattern(periodPattern).required().messages({
    "string.pattern.base": "Period must be in YYYY-MM format.",
  }),

  basicSalary: Joi.number().min(0).required(),

  allowances: Joi.number().min(0).default(0),

  deductions: Joi.number().min(0).default(0),
});

const payrollIdParamSchema = Joi.object({
  id: Joi.string().pattern(objectIdPattern).required(),
});

module.exports = {
  createPayrollSchema,
  payrollIdParamSchema,
};