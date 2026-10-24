const { Router } = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const validationMiddleware = require("../middleware/validation.middleware");

const {
  createPayrollSchema,
  payrollIdParamSchema,
} = require("../validations/payroll.validation");

const {
  createPayrollController,
  getAllPayrollController,
  getPayrollByIdController,
} = require("../controllers/payroll.controller");

const payrollRouter = Router();

function adminOnly(req, res, next) {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Admin privileges are required.",
    });
  }

  next();
}

// Create payroll
payrollRouter.post(
  "/",
  authMiddleware,
  adminOnly,
  validationMiddleware(createPayrollSchema),
  createPayrollController
);

// Get all payroll records
payrollRouter.get(
  "/",
  authMiddleware,
  adminOnly,
  getAllPayrollController
);

// Get payroll by ID
payrollRouter.get(
  "/:id",
  authMiddleware,
  adminOnly,
  validationMiddleware(payrollIdParamSchema, "params"),
  getPayrollByIdController
);

module.exports = { payrollRouter };