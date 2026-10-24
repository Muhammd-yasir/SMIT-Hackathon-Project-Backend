
const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const validationMiddleware = require("../middleware/validation.middleware");

const {
  actorIdParamSchema,
} = require("../validations/audit.validation");

const {
  getAllAuditLogsController,
  getAuditLogsByActorController,
} = require("../controllers/audit.controller");

const auditRouter = Router();

function adminOnly(req, res, next) {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Access denied. Admin privileges are required.",
    });
  }

  next();
}

auditRouter.get(
  "/",
  authMiddleware,
  adminOnly,
  getAllAuditLogsController
);

auditRouter.get(
  "/actor/:actorId",
  authMiddleware,
  adminOnly,
  validationMiddleware(actorIdParamSchema, "params"),
  getAuditLogsByActorController
);

module.exports = { auditRouter };
