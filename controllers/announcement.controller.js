
const {
  createAnnouncementService,
  getAnnouncementsService,
  getAnnouncementByIdService,
} = require("../services/announcement.service");

async function createAnnouncementController(req, res, next) {
  try {
    const announcement = await createAnnouncementService(
      req.body,
      req.user.id
    );

    return res.status(201).json({
      message: "Announcement created successfully.",
      announcement,
    });
  } catch (error) {
    next(error);
  }
}

async function getAnnouncementsController(req, res, next) {
  try {
    const announcements = await getAnnouncementsService();

    return res.status(200).json({
      message: "Announcements fetched successfully.",
      count: announcements.length,
      announcements,
    });
  } catch (error) {
    next(error);
  }
}

async function getAnnouncementByIdController(req, res, next) {
  try {
    const announcement = await getAnnouncementByIdService(req.params.id);

    return res.status(200).json({
      message: "Announcement fetched successfully.",
      announcement,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createAnnouncementController,
  getAnnouncementsController,
  getAnnouncementByIdController,
};
