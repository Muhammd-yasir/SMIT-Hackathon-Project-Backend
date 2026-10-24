const { Schema, model } = require("mongoose");

const leaveSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "employee",
      required: true,
    },
    leaveType: {
      type: String,
      enum: ["ANNUAL", "SICK", "PERSONAL", "UNPAID", "OTHER"],
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

module.exports = model("leave", leaveSchema);