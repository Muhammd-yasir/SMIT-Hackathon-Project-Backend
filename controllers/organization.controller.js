
const {
  createOrganizationService,
  getOrganizationService,
  updateOrganizationService,
} = require("../services/organization.service");

async function createOrganizationController(req, res, next) {
  try {
    const organization = await createOrganizationService(
      req.body,
      req.user.id
    );

    return res.status(201).json({
      message: "Organization created successfully.",
      organization,
    });
  } catch (error) {
    next(error);
  }
}

async function getOrganizationController(req, res, next) {
  try {
    const organization = await getOrganizationService(req.user.id);

    return res.status(200).json({
      message: "Organization fetched successfully.",
      organization,
    });
  } catch (error) {
    next(error);
  }
}

async function updateOrganizationController(req, res, next) {
  try {
    const organization = await updateOrganizationService(
      req.body,
      req.user.id
    );

    return res.status(200).json({
      message: "Organization updated successfully.",
      organization,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createOrganizationController,
  getOrganizationController,
  updateOrganizationController,
};
