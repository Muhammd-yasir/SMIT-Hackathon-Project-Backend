
const { Router } = require("express");

const { authRouter } = require("./auth.route");
const { organizationRouter } = require("./organization.route");
const { attendanceRouter } = require("./attendance.route");
const { auditRouter } = require("./audit.route");
const { announcementRouter } = require("./announcement.route");
const { leaveRouter } = require("./leave.route");
const { payrollRouter } = require("./payroll.route");



const router = Router();

router.use("/auth", authRouter);
router.use("/organization", organizationRouter);
router.use("/attendance", attendanceRouter);
router.use("/audit", auditRouter);
router.use("/announcements", announcementRouter);
router.use("/leaves", leaveRouter);
router.use("/payroll", payrollRouter);

module.exports = router;
