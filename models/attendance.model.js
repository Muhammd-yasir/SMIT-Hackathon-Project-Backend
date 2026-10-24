const { Schema, model } = require("mongoose");

const attendanceSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "employee",
      required: true,
    },
    date: { type: String, required: true }, // YYYY-MM-DD
    checkIn: Date,
    checkOut: Date,
    status: {
      type: String,
      enum: ["PRESENT", "ABSENT", "LATE", "ON_LEAVE"],
      default: "PRESENT",
    },
  },
  { timestamps: true }
);

attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

module.exports = model("attendance", attendanceSchema);