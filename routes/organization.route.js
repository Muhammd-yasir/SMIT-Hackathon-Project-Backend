
const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const validationMiddleware = require("../middleware/validation.middleware");

const {
  createOrganizationSchema,
  updateOrganizationSchema,
} = require("../validations/organization.validation");

const {
  createOrganizationController,
  getOrganizationController,
  updateOrganizationController,
} = require("../controllers/organization.controller");

const organizationRouter = Router();

organizationRouter.post(
  "/",
  authMiddleware,
  validationMiddleware(createOrganizationSchema),
  createOrganizationController
);

organizationRouter.get(
  "/",
  authMiddleware,
  getOrganizationController
);

organizationRouter.patch(
  "/",
  authMiddleware,
  validationMiddleware(updateOrganizationSchema),
  updateOrganizationController
);

module.exports = { organizationRouter };
