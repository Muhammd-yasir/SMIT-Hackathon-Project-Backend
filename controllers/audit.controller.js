
const {
  getAllAuditLogsService,
  getAuditLogsByActorService,
} = require("../services/audit.service");

async function getAllAuditLogsController(req, res, next) {
  try {
    const logs = await getAllAuditLogsService();

    return res.status(200).json({
      message: "Audit logs fetched successfully.",
      count: logs.length,
      logs,
    });
  } catch (error) {
    next(error);
  }
}

async function getAuditLogsByActorController(req, res, next) {
  try {
    const { actorId } = req.params;

    const logs = await getAuditLogsByActorService(actorId);

    return res.status(200).json({
      message: "Actor audit logs fetched successfully.",
      count: logs.length,
      logs,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllAuditLogsController,
  getAuditLogsByActorController,
};
