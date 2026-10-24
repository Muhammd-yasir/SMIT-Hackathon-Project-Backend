
const { Schema, model } = require("mongoose");

const employeeSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Employee name is required"],
      trim: true,
      minlength: 3,
      maxlength: 80,
    },
    email: {
      type: String,
      required: [true, "Employee email is required"],
      trim: true,
      lowercase: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    employmentStatus: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

employeeSchema.index({ email: 1 }, { unique: true });

module.exports = model("employee", employeeSchema);
