
const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const validationMiddleware = require("../middleware/validation.middleware");

const {
  attendanceEmployeeSchema,
} = require("../validations/attendance.validation");

const Joi = require("joi");

const {
  checkInController,
  checkOutController,
  getAllAttendanceController,
  getEmployeeAttendanceController,
} = require("../controllers/attendance.controller");

const attendanceRouter = Router();

const employeeIdParamSchema = Joi.object({
  employeeId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
});

// Check in
attendanceRouter.post(
  "/check-in",
  authMiddleware,
  validationMiddleware(attendanceEmployeeSchema),
  checkInController
);

// Check out
attendanceRouter.patch(
  "/check-out",
  authMiddleware,
  validationMiddleware(attendanceEmployeeSchema),
  checkOutController
);

// Get all attendance records
attendanceRouter.get(
  "/",
  authMiddleware,
  getAllAttendanceController
);

// Get attendance for a specific employee
attendanceRouter.get(
  "/employee/:employeeId",
  authMiddleware,
  validationMiddleware(employeeIdParamSchema, "params"),
  getEmployeeAttendanceController
);

module.exports = { attendanceRouter };
