const { Router } = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const validationMiddleware = require("../middleware/validation.middleware");

const {
  createLeaveSchema,
  leaveIdParamSchema,
  reviewLeaveSchema,
} = require("../validations/leave.validation");

const {
  createLeaveController,
  getAllLeavesController,
  getLeaveByIdController,
  reviewLeaveController,
} = require("../controllers/leave.controller");

const leaveRouter = Router();

function adminOnly(req, res, next) {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Admin privileges are required.",
    });
  }

  next();
}

// Submit a leave request
leaveRouter.post(
  "/",
  authMiddleware,
  validationMiddleware(createLeaveSchema),
  createLeaveController
);

// View all leave requests (Admin only)
leaveRouter.get(
  "/",
  authMiddleware,
  adminOnly,
  getAllLeavesController
);

// Review a leave request (Admin only)
leaveRouter.patch(
  "/:id/review",
  authMiddleware,
  adminOnly,
  validationMiddleware(leaveIdParamSchema, "params"),
  validationMiddleware(reviewLeaveSchema),
  reviewLeaveController
);

// View one leave request (Admin only)
leaveRouter.get(
  "/:id",
  authMiddleware,
  adminOnly,
  validationMiddleware(leaveIdParamSchema, "params"),
  getLeaveByIdController
);

module.exports = { leaveRouter };