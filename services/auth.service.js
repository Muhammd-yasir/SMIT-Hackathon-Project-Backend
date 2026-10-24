require("dotenv").config()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../lib/helpers/email");
const { Onboard } = require("../lib/emailTemplates/auth.template");
const { OTP } = require("otplib");
const getMinutes = require("../lib/helpers/getMins");
const User = require("../models/auth.model");
const Otp = require("../models/otp.model");

// SIGN-UP
const userSignUpService = async (body) => {
    const { password, email } = body;

    const user = await User.findOne({ email });

    if (user) {
        return {
            status: 409,
            message: "Email Already Exists"
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashedPassword });

    // await sendMail(
    //     email,
    //     Onboard.subject,
    //     Onboard.text
    // );

    return {
        status: 201,
        message: "User Created"
    };
};

// LOGIN
const loginUserService = async (body) => {
    const { email, password } = body;


    const user = await User.findOne({ email });

    if (!user) {
        return {
            status: 400,
            message: "Credentials Not Found"
        };
    }

    const isPasswordMatched = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordMatched) {
        return {
            status: 400,
            message: "Credentials Not Found"
        };
    }

    const token = jwt.sign(
        {
            email: user.email,
            id: user._id.toString(),
            role: user.role
        },
        process.env.SECRET_KEY
    );

    return {
        status: 200,
        message: "User Logged In Successful",
        token: token
    };
};

// FORGOT PASSWORD
const forgotPasswordService = async (body) => {
    const { email } = body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        return {
            status: 404,
            message: "User Not Found"
        };
    }

    // Generate OTP:
    const otp = new OTP();
    const secret = otp.generateSecret();
    const token = await otp.generate({ secret });


    // Remove previous unverified OTPs for this email
    await Otp.deleteMany({
        email,
        confirmedAt: null
    });

    await Otp.create({
        token: String(token),
        secret,
        email,
        type: "FORGOT_PASSWORD"
    });

    await sendMail(
        email,
        "OTP Code",
        `Please use this token: ${token}. It will expire in 5 minutes.`
    );

    return {
        status: 200,
        message: "OTP has been sent to your email"
    };
};


// VERIFY OTP
const verifyOTPService = async (body) => {
    const { otp, email } = body;


    // Find the OTP belonging to this email
    const existingOTP = await Otp.findOne({
        email,
        token: String(otp),
        type: "FORGOT_PASSWORD",
        confirmedAt: null
    }).sort({ createdAt: -1 });

    if (!existingOTP) {
        return {
            status: 400,
            message: "OTP record not exists or OTP is invalid"
        };
    }

    // Check whether the OTP has expired
    const isExpired = checkIfExpired(
        existingOTP.createdAt,
        getMinutes(5)
    );

    if (isExpired) {
        await Otp.deleteOne({ _id: existingOTP._id });

        return {
            status: 400,
            message: "OTP expired generate a new otp"
        };
    }

    // Mark OTP as verified
    existingOTP.confirmedAt = new Date();
    await existingOTP.save();

    return {
        status: 200,
        message: "OTP verified successfully"
    };
};

// RESET PASSWORD
const resetPasswordService = async (body) => {
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
        return {
            status: 400,
            message: "Email and password are required"
        };
    }

    if (typeof password !== "string" || password.length < 8) {
        return {
            status: 400,
            message: "Password must be at least 8 characters long"
        };
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
        return {
            status: 404,
            message: "User Not Found"
        };
    }

    // Check OTP verification
    const verifiedOTP = await Otp.findOne({
        email,
        confirmedAt: { $ne: null }
    }).sort({ createdAt: -1 });

    if (!verifiedOTP) {
        return {
            status: 400,
            message: "Please Verify OTP First"
        };
    }

    // Check OTP Expiration
    const isExpired = checkIfExpired(
        verifiedOTP.createdAt,
        getMinutes(5)
    );

    if (isExpired) {
        await Otp.deleteOne({ _id: verifiedOTP._id });

        return {
            status: 400,
            message: "OTP Expired! Please request a new OTP"
        };
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password and clear reset-related fields
    const updatedUser = await User.updateOne(
        { _id: user._id },
        {
            $set: {
                password: hashedPassword
            }
        }
    );

    // Remove the OTP after a successful password reset
    if (updatedUser.modifiedCount === 1) {
        await Otp.deleteOne({ _id: verifiedOTP._id });
    }

    if (updatedUser.modifiedCount !== 1) {
        return {
            status: 500,
            message: "Password could not be updated"
        };
    }

    return {
        status: 200,
        message: "Password Reset Successful"
    };
};

// Check whether the OTP has expired
const checkIfExpired = (creationTime, expiryDurationInMS) => {
    const currentTime = Date.now();

    return currentTime >= creationTime.getTime() + expiryDurationInMS;
};

module.exports = {
    userSignUpService,
    loginUserService,
    forgotPasswordService,
    verifyOTPService,
    resetPasswordService
};
