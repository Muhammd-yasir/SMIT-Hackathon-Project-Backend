
const Audit = require("../models/audit.model");

async function getAllAuditLogsService() {
  return Audit.find()
    .populate("actor", "email role")
    .sort({ createdAt: -1 });
}

async function getAuditLogsByActorService(actorId) {
  return Audit.find({ actor: actorId })
    .populate("actor", "email role")
    .sort({ createdAt: -1 });
}

module.exports = {
  getAllAuditLogsService,
  getAuditLogsByActorService,
};
