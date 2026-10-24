const { Schema, model } = require("mongoose");

const payrollSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "employee",
      required: true,
    },
    period: { type: String, required: true }, // YYYY-MM
    basicSalary: { type: Number, required: true, min: 0 },
    allowances: { type: Number, default: 0, min: 0 },
    deductions: { type: Number, default: 0, min: 0 },
    netSalary: { type: Number, required: true, min: 0 },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

payrollSchema.index({ employee: 1, period: 1 }, { unique: true });

module.exports = model("payroll", payrollSchema);