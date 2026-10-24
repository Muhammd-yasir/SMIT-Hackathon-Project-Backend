
const { Router } = require("express");

const { authRouter } = require("./auth.route");
const { organizationRouter } = require("./organization.route");
const { attendanceRouter } = require("./attendance.route");
const { auditRouter } = require("./audit.route");

const router = Router();

router.use("/auth", authRouter);
router.use("/organization", organizationRouter);
router.use("/attendance", attendanceRouter);
router.use("/audit", auditRouter);

module.exports = router;
