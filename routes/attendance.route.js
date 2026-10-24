
const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const {
  checkInController,
  checkOutController,
  getAllAttendanceController,
  getEmployeeAttendanceController,
} = require("../controllers/attendance.controller");

const attendanceRouter = Router();

// Check in an employee
attendanceRouter.post(
  "/check-in",
  authMiddleware,
  checkInController
);

// Check out an employee
attendanceRouter.patch(
  "/check-out",
  authMiddleware,
  checkOutController
);

// Get all attendance records
attendanceRouter.get(
  "/",
  authMiddleware,
  getAllAttendanceController
);

// Get attendance records for one employee
attendanceRouter.get(
  "/employee/:employeeId",
  authMiddleware,
  getEmployeeAttendanceController
);

module.exports = { attendanceRouter };
