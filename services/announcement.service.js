
const Announcement = require("../models/communication.model");

async function createAnnouncementService(body, userId) {
  const announcement = await Announcement.create({
    ...body,
    createdBy: userId,
  });

  return announcement;
}

async function getAnnouncementsService() {
  return Announcement.find()
    .populate("createdBy", "email role")
    .sort({ createdAt: -1 });
}

async function getAnnouncementByIdService(announcementId) {
  const announcement = await Announcement.findById(announcementId)
    .populate("createdBy", "email role");

  if (!announcement) {
    const error = new Error("Announcement not found.");
    error.statusCode = 404;
    throw error;
  }

  return announcement;
}

module.exports = {
  createAnnouncementService,
  getAnnouncementsService,
  getAnnouncementByIdService,
};
