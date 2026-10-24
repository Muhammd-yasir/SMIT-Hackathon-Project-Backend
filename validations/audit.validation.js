
const Joi = require("joi");

const actorIdParamSchema = Joi.object({
  actorId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
});

module.exports = {
  actorIdParamSchema,
};
