
const {
  createEmployeeService,
  getEmployeesService,
  getEmployeeByIdService,
  updateEmployeeService,
} = require("../services/employee.service");

const createEmployeeController = async (req, res, next) => {
  try {
    const result = await createEmployeeService(req.body, req.user.id);
    return res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
};

const getEmployeesController = async (req, res, next) => {
  try {
    const result = await getEmployeesService();
    return res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
};

const getEmployeeByIdController = async (req, res, next) => {
  try {
    const result = await getEmployeeByIdService(req.params.id);
    return res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
};

const updateEmployeeController = async (req, res, next) => {
  try {
    const result = await updateEmployeeService(req.params.id, req.body);
    return res.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEmployeeController,
  getEmployeesController,
  getEmployeeByIdController,
  updateEmployeeController,
};
