
const Attendance = require("../models/attendance.model");
const Employee = require("../models/employee.model");

function getTodayDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value])
  );

  return `${values.year}-${values.month}-${values.day}`;
}

async function checkInService(employeeId) {
  const employee = await Employee.findById(employeeId);

  if (!employee) {
    const error = new Error("Employee not found.");
    error.statusCode = 404;
    throw error;
  }

  if (employee.employmentStatus !== "ACTIVE") {
    const error = new Error("Cannot record attendance for an inactive employee.");
    error.statusCode = 400;
    throw error;
  }

  const date = getTodayDate();

  try {
    return await Attendance.create({
      employee: employeeId,
      date,
      checkIn: new Date(),
      status: "PRESENT",
    });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateError = new Error(
        "Attendance has already been recorded for today."
      );
      duplicateError.statusCode = 409;
      throw duplicateError;
    }

    throw error;
  }
}

async function checkOutService(employeeId) {
  const attendance = await Attendance.findOne({
    employee: employeeId,
    date: getTodayDate(),
  });

  if (!attendance) {
    const error = new Error("No attendance record found for today.");
    error.statusCode = 404;
    throw error;
  }

  if (attendance.checkOut) {
    const error = new Error("Employee has already checked out.");
    error.statusCode = 409;
    throw error;
  }

  attendance.checkOut = new Date();
  await attendance.save();

  return attendance;
}

async function getAllAttendanceService() {
  return Attendance.find()
    .populate("employee", "fullName email department jobTitle")
    .sort({ date: -1, createdAt: -1 });
}

async function getEmployeeAttendanceService(employeeId) {
  const employee = await Employee.findById(employeeId);

  if (!employee) {
    const error = new Error("Employee not found.");
    error.statusCode = 404;
    throw error;
  }

  return Attendance.find({ employee: employeeId })
    .populate("employee", "fullName email department jobTitle")
    .sort({ date: -1 });
}

module.exports = {
  checkInService,
  checkOutService,
  getAllAttendanceService,
  getEmployeeAttendanceService,
};
