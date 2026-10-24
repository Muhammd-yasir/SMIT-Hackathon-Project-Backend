
const Joi = require("joi");

const createOrganizationSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  industry: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().trim().email().lowercase().allow(""),
  phone: Joi.string().trim().max(20).allow(""),
  website: Joi.string().trim().uri().allow(""),
  timezone: Joi.string().trim().default("Asia/Karachi"),
  address: Joi.string().trim().max(300).allow(""),
});

const updateOrganizationSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  industry: Joi.string().trim().min(2).max(100),
  email: Joi.string().trim().email().lowercase().allow(""),
  phone: Joi.string().trim().max(20).allow(""),
  website: Joi.string().trim().uri().allow(""),
  timezone: Joi.string().trim(),
  address: Joi.string().trim().max(300).allow(""),
}).min(1);

module.exports = {
  createOrganizationSchema,
  updateOrganizationSchema,
};
