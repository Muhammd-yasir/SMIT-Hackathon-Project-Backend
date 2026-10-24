
const { Schema, model } = require("mongoose");

const auditSchema = new Schema(
  {
    actor: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    action: {
      type: String,
      required: [true, "Action is required"],
      enum: [
        "LOGIN",
        "EMPLOYEE_CREATED",
        "EMPLOYEE_UPDATED",
        "ORGANIZATION_CREATED",
        "ORGANIZATION_UPDATED",
        "ATTENDANCE_CHECK_IN",
        "ATTENDANCE_CHECK_OUT",
        "LEAVE_SUBMITTED",
        "LEAVE_APPROVED",
        "LEAVE_REJECTED",
        "PAYROLL_CREATED",
        "ANNOUNCEMENT_CREATED",
      ],
    },

    resource: {
      type: String,
      required: [true, "Resource type is required"],
      trim: true,
    },

    resourceId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

auditSchema.index({ createdAt: -1 });
auditSchema.index({ actor: 1, createdAt: -1 });

const Audit = model("audit", auditSchema);

module.exports = Audit;
