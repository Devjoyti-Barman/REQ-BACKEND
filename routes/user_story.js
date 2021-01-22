const router = require("express").Router();
const UserStory = require("../model/UserStory");
const verify = require("./verify_token");
var ObjectID = require("mongodb").ObjectID;

router.post("/add-story", verify, async (req, res) => {
  let d = new Date();
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let time = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();

  const story = new UserStory({
    userId: req.user._id,
    projectId: req.body.project_id,
    storyDetails: {
      storyTitle: req.body.story_details.story_title,
      asA: req.body.story_details.as_a,
      actionRequirement: req.body.story_details.action_requirement,
      actionOutput: req.body.story_details.action_output,
      actionAssignedTo: req.body.story_details.action_assigned_to,
      actionProvidedBy: req.body.story_details.action_provided_by,
      actionReceivedMode: req.body.story_details.action_received_mode,
      priority: req.body.story_details.priority,
      details: req.body.story_details.details,
      date: time,
    },
  });
  try {
    const saveStory = await story.save();
    res.status(200).send({
      error: "",
      message: "Story added successfully",
      story: story._id,
    });
  } catch (err) {
    res.status(500).send({ error: "Internal server error " + err });
  }
});

router.get("/get-stories/:type/:id", verify, async (req, res) => {
  var type = req.params.type;
  const id = req.params.id;
  try {
    var object;
    if (type === "userid") object = { userId: req.user._id };
    else object = { projectId: req.params.id };

    UserStory.find(object, async (err, result) => {
      try {
        if (err) {
          res.send("Some error occured");
        } else {
          res.json(result);
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: error });
      }
    });
  } catch (err) {
    res.status(500).send({ error: "Internal server error " + err });
  }
});
router.put("/update-story/:id", verify, async (req, res) => {
  let d = new Date();
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let time = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  const id = req.params.id;
  try {
    const updatedStory = {
      storyDetails: {
        storyTitle: req.body.story_details.story_title,
        asA: req.body.story_details.as_a,
        actionRequirement: req.body.story_details.action_requirement,
        actionOutput: req.body.story_details.action_output,
        actionAssignedTo: req.body.story_details.action_assigned_to,
        actionProvidedBy: req.body.story_details.action_provided_by,
        actionReceivedMode: req.body.story_details.action_received_mode,
        priority: req.body.story_details.priority,
        details: req.body.story_details.details,
        date: time,
      },
    };

    await UserStory.findByIdAndUpdate(
      id,
      updatedStory,
      { new: true },
      (error, result) => {
        if (error) {
          res.status(400).send(error);
        } else {
          res.send(result);
        }
      }
    );
  } catch (err) {
    res.status(400).send({ error: err });
  }
});
router.get("/get-all-assigned-stories", verify, async (req, res) => {
  const id = req.user._id;
  var assignedRequirements = [];
  UserStory.find({}, async (err, result) => {
    try {
      if (err) {
        res.send("Some error occured");
      } else {
        result.forEach(function (r) {
          if (r.storyDetails.actionAssignedTo === id) {
            assignedRequirements.push(r);
          }
        });
        res.status(200).send(assignedRequirements);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error });
    }
  });
});
router.post("/get-all-assigned", verify, async (req, res) => {
  const id = req.user._id;
  const email = req.body.email;
  var assignedRequirements = [];
  UserStory.find({}, async (err, result) => {
    try {
      if (err) {
        res.send("Some error occured");
      } else {
        result.forEach(function (r) {
          if (r.storyDetails.actionAssignedTo === email) {
            assignedRequirements.push(r);
          }
        });
        res.status(200).send(assignedRequirements);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error });
    }
  });
});
module.exports = router;
