const Joi = require("joi");

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const createLeaveSchema = Joi.object({
  employee: Joi.string().pattern(objectIdPattern).required().messages({
    "string.pattern.base": "A valid employee ID is required.",
  }),

  leaveType: Joi.string()
    .valid("ANNUAL", "SICK", "PERSONAL", "UNPAID", "OTHER")
    .required(),

  startDate: Joi.date().iso().required(),

  endDate: Joi.date()
    .iso()
    .min(Joi.ref("startDate"))
    .required()
    .messages({
      "date.min": "End date must be on or after the start date.",
    }),

  reason: Joi.string().trim().min(3).max(1000).required(),
});

const leaveIdParamSchema = Joi.object({
  id: Joi.string().pattern(objectIdPattern).required(),
});

const reviewLeaveSchema = Joi.object({
  status: Joi.string().valid("APPROVED", "REJECTED").required(),
});

module.exports = {
  createLeaveSchema,
  leaveIdParamSchema,
  reviewLeaveSchema,
};