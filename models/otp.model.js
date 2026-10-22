const { model, Schema } = require("mongoose");

const otpSchema = new Schema(
    {
        email : {
           type: String,
           required: true,
           lowercase : true,
           trim: true
        },
        token : {
            type: String, 
            required : true
        },
        secret : {
            type : String, 
            required : true
        },
        type : {
            type : String, 
            enum : ["LOGIN", "FORGOT_PASSWORD", "UPDATE_PASSWORD"],
            default : "LOGIN"
        },

        confirmedAt : {
            type : Date, 
            default : null
        },
    },
    {
        timestamps : true
    },
);

const Otp = model("otp", otpSchema);
module.exports = Otp;
