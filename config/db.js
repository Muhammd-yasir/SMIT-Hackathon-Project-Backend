const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB(){
    await mongoose.connect(process.env.DB_URI);
    console.log("Database Connected Successfully");
};

module.exports = connectDB;