const {
  createPayrollService,
  getAllPayrollService,
  getPayrollByIdService,
} = require("../services/payroll.service");

async function createPayrollController(req, res, next) {
  try {
    const payroll = await createPayrollService(req.body, req.user.id);

    return res.status(201).json({
      message: "Payroll created successfully.",
      data: payroll,
    });
  } catch (error) {
    next(error);
  }
}

async function getAllPayrollController(req, res, next) {
  try {
    const payroll = await getAllPayrollService();

    return res.status(200).json({
      message: "Payroll records fetched successfully.",
      data: payroll,
    });
  } catch (error) {
    next(error);
  }
}

async function getPayrollByIdController(req, res, next) {
  try {
    const payroll = await getPayrollByIdService(req.params.id);

    return res.status(200).json({
      message: "Payroll record fetched successfully.",
      data: payroll,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createPayrollController,
  getAllPayrollController,
  getPayrollByIdController,
};