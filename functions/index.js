const { getcomplaintsData } = require("./complaints/getComplaints");
const { resolveAllComplaints } = require("./complaints/resolveAllComplaints");
const { resolveComplaint } = require("./complaints/reolveComplaint");
module.exports = {
  getcomplaintsData,
  resolveAllComplaints,
  resolveComplaint,
};
