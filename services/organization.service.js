
const Organization = require("../models/organization.model");

async function createOrganizationService(body, userId) {
  const existingOrganization = await Organization.findOne({
    createdBy: userId,
  });

  if (existingOrganization) {
    const error = new Error("You have already created an organization.");
    error.statusCode = 409;
    throw error;
  }

  const organization = await Organization.create({
    ...body,
    createdBy: userId,
  });

  return organization;
}

async function getOrganizationService(userId) {
  const organization = await Organization.findOne({
    createdBy: userId,
  });

  if (!organization) {
    const error = new Error("Organization not found.");
    error.statusCode = 404;
    throw error;
  }

  return organization;
}

async function updateOrganizationService(body, userId) {
  const organization = await Organization.findOneAndUpdate(
    { createdBy: userId },
    { $set: body },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!organization) {
    const error = new Error("Organization not found.");
    error.statusCode = 404;
    throw error;
  }

  return organization;
}

module.exports = {
  createOrganizationService,
  getOrganizationService,
  updateOrganizationService,
};
