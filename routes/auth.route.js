const { Router } = require("express");
const { 
    signupSchema,
    signinSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    verifyOtpSchema 
} = require("../validations/auth.validation");
const validationMiddleware = require("../middleware/validation.middleware");
const { 
        signUpController,
        loginController,
        forgotPasswordController,
        verifyOtpController,
        resetPasswordController
} = require("../controllers/auth.controller");
const router = Router();


// SignUp
router.post("/sign-up",
    validationMiddleware(signupSchema),
    signUpController
);

// Login
router.post("/login",
    validationMiddleware(signinSchema),
    loginController
);

// forget- password 
router.post("/forgot-password", validationMiddleware(forgotPasswordSchema), forgotPasswordController);

// verify-otp
router.post("/verify-otp", validationMiddleware(verifyOtpSchema), verifyOtpController);

// reset-password
router.put("/reset-password", validationMiddleware(resetPasswordSchema), resetPasswordController);
   


module.exports = { authRouter : router };