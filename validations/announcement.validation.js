
const Joi = require("joi");

const createAnnouncementSchema = Joi.object({
  title: Joi.string().trim().min(3).max(150).required(),

  audience: Joi.string()
    .valid("EVERYONE", "HR", "MANAGERS", "EMPLOYEES")
    .required(),

  message: Joi.string().trim().min(1).max(5000).required(),
});

module.exports = {
  createAnnouncementSchema,
};
