const {
    userSignUpService,
    loginUserService,
    forgotPasswordService,
    verifyOTPService,
    resetPasswordService
} = require("../services/auth.service");

// sign-up controller 

const signUpController = async (req, res) => {

    const result = await userSignUpService(req.body, res);

    return res.status(result.status).send(result.message);
};

// login controller

const loginController = async (req, res) => {

    const result = await loginUserService(req.body, res);

    if (result.status !== 200) {
        return res.status(result.status).send(result.message);
    }

    return res.status(result.status).send({
        message: result.message,
        token: result.token
    });
};

// forgot password controller

const forgotPasswordController = async (req, res) => {

    const result = await forgotPasswordService(req.body);

    return res.status(result.status).send(result.message);
};

// verify OTP controller

const verifyOtpController = async (req, res) => {

    const result = await verifyOTPService(req.body, res);

    return res.status(result.status).send(result.message);
};

// reset password controller

const resetPasswordController = async (req, res) => {

    const result = await resetPasswordService(req.body);

    return res.status(result.status).send(result.message)
}

module.exports = {
    signUpController,
    loginController,
    forgotPasswordController,
    verifyOtpController,
    resetPasswordController
};