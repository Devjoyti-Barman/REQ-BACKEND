const router = require("express").Router();
const JobTobeDone = require("../model/JobTobeDone");
const verify = require("./verify_token");
var ObjectID = require("mongodb").ObjectID;

router.post("/add-jtbd", verify, async (req, res) => {
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

  const story = new JobTobeDone({
    userId: req.user._id,
    projectId: req.body.project_id,
    JobTobeDone: {
      description: req.body.story_details.description,
      persona: req.body.story_details.persona,
      situation: req.body.story_details.situation,
      whatiwant: req.body.story_details.whatiwant,
      soican: req.body.story_details.soican,
      assignTo: req.body.story_details.assignTo,
      details: req.body.story_details.details,
      watchlist: req.body.story_details.watchlist,
      providedBy: req.body.story_details.providedBy,
      mode: req.body.story_details.mode,
      priority: req.body.story_details.priority,
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

router.get("/get-jtbd/:type/:id", verify, async (req, res) => {
  var type = req.params.type;
  const id = req.params.id;
  try {
    var object;
    if (type === "userid") object = { userId: req.user._id };
    else object = { projectId: req.params.id };

    JobTobeDone.find(object, async (err, result) => {
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
router.put("/update-jtbd/:id", verify, async (req, res) => {
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
      JobTobeDone: {
        description: req.body.story_details.description,
        persona: req.body.story_details.persona,
        situation: req.body.story_details.situation,
        whatiwant: req.body.story_details.whatiwant,
        soican: req.body.story_details.soican,
        assignTo: req.body.story_details.assignTo,
        details: req.body.story_details.details,
        watchlist: req.body.story_details.watchlist,
        providedBy: req.body.story_details.providedBy,
        mode: req.body.story_details.mode,
        priority: req.body.story_details.priority,
      },
    };

    await JobTobeDone.findByIdAndUpdate(
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

router.post("/get-all-assigned", verify, async (req, res) => {
  const id = req.user._id;
  const email = req.body.email;
  var assignedRequirements = [];
  JobTobeDone.find({}, async (err, result) => {
    try {
      if (err) {
        res.send("Some error occured");
      } else {
        result.forEach(function (r) {
          if (r.JobTobeDone.assignTo === email) {
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
