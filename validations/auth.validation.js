const Joi = require("joi");
const { passwordRegex } = require('../lib/regex/auth.regex');


const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(passwordRegex).required().messages({
        "string.pattern.base":
            "Passowrd must be at least one uppercase letter, one lowercase letter one number and one special character"
    })
});

const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required()
});

const resetPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(passwordRegex).required().messages({
        "string.pattern.base":
            "Password must be at least one uppercase letter, one lowercase letter, one number & one special character"
    }),
});

const verifyOtpSchema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().length(6).required().messages({
        "string.length": "OTP must be exactly 6 digits",
        "string.pattern.base": "OTP must contain only numbers",
        "any.required": "OTP is required"
    })
});

module.exports = { signupSchema, signinSchema, forgotPasswordSchema, resetPasswordSchema, verifyOtpSchema }