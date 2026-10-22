const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        // name : {
        //     type : String, 
        //     required : true, 
        //     minLength : [3, "Name must be at least 3 characters"],
        //     maxLength : [30, "Name cannot be greater then 30 characters"]
        // },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"]
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            min: [8, "Passowrd must be at least 8 characters"]
        },

        role: {
            type: String,
            required: true,
            enum: ["ADMIN", "USER"],
            default: "USER"
        },

        // isActive : {
        //     type : Boolean,
        //     default : true
        // },
    },
    {
        timestamps: true
    }
);

const User = model("user", userSchema);
module.exports = User;