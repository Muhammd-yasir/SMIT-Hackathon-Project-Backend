
const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const validationMiddleware = require("../middleware/validation.middleware");

const {
  createEmployeeSchema,
  updateEmployeeSchema,
} = require("../validations/employee.validation");

const {
  createEmployeeController,
  getEmployeesController,
  getEmployeeByIdController,
  updateEmployeeController,
} = require("../controllers/employee.controller");

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  validationMiddleware(createEmployeeSchema),
  createEmployeeController
);

router.get("/", getEmployeesController);
router.get("/:id", getEmployeeByIdController);

router.patch(
  "/:id",
  validationMiddleware(updateEmployeeSchema),
  updateEmployeeController
);

module.exports = { employeeRouter: router };
