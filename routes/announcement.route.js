
const { Router } = require("express");
const Joi = require("joi");

const authMiddleware = require("../middleware/auth.middleware");
const validationMiddleware = require("../middleware/validation.middleware");

const {
  createAnnouncementSchema,
} = require("../validations/announcement.validation");

const {
  createAnnouncementController,
  getAnnouncementsController,
  getAnnouncementByIdController,
} = require("../controllers/announcement.controller");

const announcementRouter = Router();

const announcementIdSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
});

function adminOnly(req, res, next) {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Admin privileges are required to create announcements.",
    });
  }

  next();
}

// Create announcement — ADMIN only
announcementRouter.post(
  "/",
  authMiddleware,
  adminOnly,
  validationMiddleware(createAnnouncementSchema),
  createAnnouncementController
);

// Get all announcements — authenticated users
announcementRouter.get(
  "/",
  authMiddleware,
  getAnnouncementsController
);

// Get one announcement — authenticated users
announcementRouter.get(
  "/:id",
  authMiddleware,
  validationMiddleware(announcementIdSchema, "params"),
  getAnnouncementByIdController
);

module.exports = { announcementRouter };
