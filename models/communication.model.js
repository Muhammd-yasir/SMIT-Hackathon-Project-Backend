
const { Schema, model } = require("mongoose");

const announcementSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Announcement title is required"],
      trim: true,
      minlength: 3,
      maxlength: 150,
    },

    audience: {
      type: String,
      required: [true, "Audience is required"],
      enum: ["EVERYONE", "HR", "MANAGERS", "EMPLOYEES"],
    },

    message: {
      type: String,
      required: [true, "Announcement message is required"],
      trim: true,
      minlength: 1,
      maxlength: 5000,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Announcement = model("announcement", announcementSchema);

module.exports = Announcement;
