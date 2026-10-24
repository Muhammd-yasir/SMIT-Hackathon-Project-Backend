
const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const {
  getAllAuditLogsController,
  getAuditLogsByActorController,
} = require("../controllers/audit.controller");

const auditRouter = Router();

// Only ADMIN users can view audit logs
function adminOnly(req, res, next) {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Access denied. Admin privileges are required.",
    });
  }

  next();
}

// Get all audit logs
auditRouter.get(
  "/",
  authMiddleware,
  adminOnly,
  getAllAuditLogsController
);

// Get audit logs for a specific user
auditRouter.get(
  "/actor/:actorId",
  authMiddleware,
  adminOnly,
  getAuditLogsByActorController
);

module.exports = { auditRouter };
