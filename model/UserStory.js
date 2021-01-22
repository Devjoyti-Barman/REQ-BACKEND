const mongoose = require("mongoose");

const userStorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
  storyDetails: {
    storyTitle: {
      type: String,
    },
    asA: {
      type: String,
    },
    actionRequirement: {
      type: String,
    },
    actionOutput: {
      type: String,
    },
    actionAssignedTo: {
      type: String,
    },
    actionProvidedBy: {
      type: String,
    },
    actionReceivedMode: {
      type: String,
    },
    priority: {
      type: String,
    },
    details: {
      type: String,
    },
    date: {
      type: String,
    },
  },
});

module.exports = mongoose.model("UserStory", userStorySchema);
