const mongoose = require("mongoose");

const JobTobeDoneSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
  JobTobeDone: {
    description: {
      type: String,
    },
    persona: {
      type: String,
    },
    situation: {
      type: String,
    },
    whatiwant: {
      type: String,
    },
    soican: {
      type: String,
    },
    assignTo: {
      type: String,
    },
    details: {
      type: String,
    },
    providedBy: {
      type: String,
    },
    mode: {
      type: String,
    },
    priority: {
      type: String,
    },
    date: {
      type: String,
    },
  },
});

module.exports = mongoose.model("JobTobeDone", JobTobeDoneSchema);
