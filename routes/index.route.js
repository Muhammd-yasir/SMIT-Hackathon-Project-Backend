const { Router } = require("express");
const { authRouter } = require("./auth.route");
const { employeeRoute } = require("./employee.route");
const { organizationRouter } = require("./organization.route");
const { attendanceRouter } = require("./attendance.route");
const { auditRouter } = require("./audit.route");
const router = Router();


router.use("/auth", authRouter);
router.use("/employees", employeeRoute);
router.use("/organization", organizationRouter);
router.use("/attendance", attendanceRouter);
router.use("/audit", auditRouter);

module.exports = router;