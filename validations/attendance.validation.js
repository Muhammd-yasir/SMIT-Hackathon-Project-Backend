
const Joi = require("joi");

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const attendanceEmployeeSchema = Joi.object({
  employeeId: Joi.string()
    .pattern(objectIdPattern)
    .required()
    .messages({
      "string.pattern.base": "A valid employee ID is required.",
    }),
});

module.exports = {
  attendanceEmployeeSchema,
};
