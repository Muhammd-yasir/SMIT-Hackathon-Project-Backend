
const Employee = require("../models/employee.model");

const createEmployeeService = async (body, userId) => {
  const existing = await Employee.findOne({
    email: body.email.toLowerCase(),
  });

  if (existing) {
    return { status: 409, message: "Employee email already exists" };
  }

  try {
    const employee = await Employee.create({
      ...body,
      email: body.email.toLowerCase(),
      createdBy: userId,
    });

    return {
      status: 201,
      message: "Employee created successfully",
      data: employee,
    };
  } catch (error) {
    if (error.code === 11000) {
      return { status: 409, message: "Employee email already exists" };
    }
    throw error;
  }
};

const getEmployeesService = async () => {
  const employees = await Employee.find()
    .sort({ createdAt: -1 })
    .select("-__v");

  return { status: 200, data: employees };
};

const getEmployeeByIdService = async (id) => {
  const employee = await Employee.findById(id);

  if (!employee) {
    return { status: 404, message: "Employee not found" };
  }

  return { status: 200, data: employee };
};

const updateEmployeeService = async (id, body) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!employee) {
      return { status: 404, message: "Employee not found" };
    }

    return {
      status: 200,
      message: "Employee updated successfully",
      data: employee,
    };
  } catch (error) {
    if (error.code === 11000) {
      return { status: 409, message: "Employee email already exists" };
    }
    throw error;
  }
};

module.exports = {
  createEmployeeService,
  getEmployeesService,
  getEmployeeByIdService,
  updateEmployeeService,
};
