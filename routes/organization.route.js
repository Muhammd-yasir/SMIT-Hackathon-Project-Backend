
const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const {
  createOrganizationController,
  getOrganizationController,
  updateOrganizationController,
} = require("../controllers/organization.controller");

const organizationRouter = Router();

// Create an organization
organizationRouter.post(
  "/",
  authMiddleware,
  createOrganizationController
);

// Get the logged-in user's organization
organizationRouter.get(
  "/",
  authMiddleware,
  getOrganizationController
);

// Update the logged-in user's organization
organizationRouter.patch(
  "/",
  authMiddleware,
  updateOrganizationController
);

module.exports = { organizationRouter };
