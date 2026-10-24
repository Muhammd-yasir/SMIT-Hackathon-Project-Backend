const Payroll = require("../models/payroll.model");
const Employee = require("../models/employee.model");

async function createPayrollService(body, userId) {
  const employee = await Employee.findById(body.employee);

  if (!employee) {
    const error = new Error("Employee not found.");
    error.statusCode = 404;
    throw error;
  }

  const allowances = body.allowances ?? 0;
  const deductions = body.deductions ?? 0;
  const netSalary = body.basicSalary + allowances - deductions;

  if (netSalary < 0) {
    const error = new Error(
      "Deductions cannot exceed basic salary plus allowances."
    );
    error.statusCode = 400;
    throw error;
  }

  try {
    return await Payroll.create({
      ...body,
      allowances,
      deductions,
      netSalary,
      createdBy: userId,
    });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateError = new Error(
        "Payroll already exists for this employee and period."
      );
      duplicateError.statusCode = 409;
      throw duplicateError;
    }

    throw error;
  }
}

async function getAllPayrollService() {
  return Payroll.find()
    .populate("employee", "fullName email department jobTitle")
    .populate("createdBy", "email role")
    .sort({ period: -1, createdAt: -1 });
}

async function getPayrollByIdService(id) {
  const payroll = await Payroll.findById(id)
    .populate("employee", "fullName email department jobTitle")
    .populate("createdBy", "email role");

  if (!payroll) {
    const error = new Error("Payroll record not found.");
    error.statusCode = 404;
    throw error;
  }

  return payroll;
}

module.exports = {
  createPayrollService,
  getAllPayrollService,
  getPayrollByIdService,
};