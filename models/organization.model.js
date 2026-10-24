const { Schema, model } = require("mongoose");

const organizationSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    industry: { type: String, required: true },
    email: { type: String, trim: true, lowercase: true },
    phone: String,
    website: String,
    timezone: { type: String, default: "Asia/Karachi" },
    address: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("organization", organizationSchema);