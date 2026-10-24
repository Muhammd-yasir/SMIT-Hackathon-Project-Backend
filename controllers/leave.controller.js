const {
  createLeaveService,
  getAllLeavesService,
  getLeaveByIdService,
  reviewLeaveService,
} = require("../services/leave.service");

async function createLeaveController(req, res, next) {
  try {
    const leave = await createLeaveService(req.body);

    return res.status(201).json({
      message: "Leave request submitted successfully.",
      data: leave,
    });
  } catch (error) {
    next(error);
  }
}

async function getAllLeavesController(req, res, next) {
  try {
    const leaves = await getAllLeavesService();

    return res.status(200).json({
      message: "Leave requests fetched successfully.",
      data: leaves,
    });
  } catch (error) {
    next(error);
  }
}

async function getLeaveByIdController(req, res, next) {
  try {
    const leave = await getLeaveByIdService(req.params.id);

    return res.status(200).json({
      message: "Leave request fetched successfully.",
      data: leave,
    });
  } catch (error) {
    next(error);
  }
}

async function reviewLeaveController(req, res, next) {
  try {
    const leave = await reviewLeaveService(
      req.params.id,
      req.body.status,
      req.user.id
    );

    return res.status(200).json({
      message: `Leave request ${req.body.status.toLowerCase()} successfully.`,
      data: leave,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createLeaveController,
  getAllLeavesController,
  getLeaveByIdController,
  reviewLeaveController,
};