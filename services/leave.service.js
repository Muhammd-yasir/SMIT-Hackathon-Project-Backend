const Leave = require("../models/leave.model");
const Employee = require("../models/employee.model");

async function createLeaveService(body) {
  const employee = await Employee.findById(body.employee);

  if (!employee) {
    const error = new Error("Employee not found.");
    error.statusCode = 404;
    throw error;
  }

  if (employee.employmentStatus !== "ACTIVE") {
    const error = new Error("Inactive employees cannot request leave.");
    error.statusCode = 400;
    throw error;
  }

  const startDate = new Date(body.startDate);
  const endDate = new Date(body.endDate);

  if (startDate < new Date(new Date().setHours(0, 0, 0, 0))) {
    const error = new Error("Leave start date cannot be in the past.");
    error.statusCode = 400;
    throw error;
  }

  return Leave.create({
    ...body,
    startDate,
    endDate,
  });
}

async function getAllLeavesService() {
  return Leave.find()
    .populate("employee", "fullName email department jobTitle")
    .populate("reviewedBy", "email role")
    .sort({ createdAt: -1 });
}

async function getLeaveByIdService(id) {
  const leave = await Leave.findById(id)
    .populate("employee", "fullName email department jobTitle")
    .populate("reviewedBy", "email role");

  if (!leave) {
    const error = new Error("Leave request not found.");
    error.statusCode = 404;
    throw error;
  }

  return leave;
}

async function reviewLeaveService(id, status, reviewerId) {
  const leave = await Leave.findById(id);

  if (!leave) {
    const error = new Error("Leave request not found.");
    error.statusCode = 404;
    throw error;
  }

  if (leave.status !== "PENDING") {
    const error = new Error("Only pending leave requests can be reviewed.");
    error.statusCode = 409;
    throw error;
  }

  leave.status = status;
  leave.reviewedBy = reviewerId;

  await leave.save();

  return leave;
}

module.exports = {
  createLeaveService,
  getAllLeavesService,
  getLeaveByIdService,
  reviewLeaveService,
};