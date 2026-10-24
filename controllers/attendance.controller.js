
const {
  checkInService,
  checkOutService,
  getAllAttendanceService,
  getEmployeeAttendanceService,
} = require("../services/attendance.service");

async function checkInController(req, res, next) {
  try {
    const { employeeId } = req.body;

    if (!employeeId) {
      return res.status(400).json({
        message: "Employee ID is required.",
      });
    }

    const attendance = await checkInService(employeeId);

    return res.status(201).json({
      message: "Employee checked in successfully.",
      attendance,
    });
  } catch (error) {
    next(error);
  }
}

async function checkOutController(req, res, next) {
  try {
    const { employeeId } = req.body;

    if (!employeeId) {
      return res.status(400).json({
        message: "Employee ID is required.",
      });
    }

    const attendance = await checkOutService(employeeId);

    return res.status(200).json({
      message: "Employee checked out successfully.",
      attendance,
    });
  } catch (error) {
    next(error);
  }
}

async function getAllAttendanceController(req, res, next) {
  try {
    const attendance = await getAllAttendanceService();

    return res.status(200).json({
      message: "Attendance records fetched successfully.",
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    next(error);
  }
}

async function getEmployeeAttendanceController(req, res, next) {
  try {
    const { employeeId } = req.params;

    const attendance = await getEmployeeAttendanceService(employeeId);

    return res.status(200).json({
      message: "Employee attendance fetched successfully.",
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkInController,
  checkOutController,
  getAllAttendanceController,
  getEmployeeAttendanceController,
};
