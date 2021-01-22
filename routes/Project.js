const router = require("express").Router();
const Project = require("../model/Project");
const verify = require("./verify_token");
var ObjectID = require("mongodb").ObjectID;

router.post("/add-project", verify, async (req, res) => {
  const project = new Project({
    organizationName: req.body.organization_name,
    projectName: req.body.project_name,
    userId: req.user._id,
    usersAssociated: req.body.associated_users_list,
  });
  try {
    const saveProject = await project.save();
    res.status(200).send({
      error: "",
      message: "Project created Successfully",
    });
  } catch (err) {
    res.status(500).send({ error: "Internal server error" + err });
  }
});

router.get("/get-projects", verify, async (req, res) => {
  const id = req.user._id;
  try {
    Project.find({ userId: id }, async (err, result) => {
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

/// get all projects
router.get("/get-all-projects", verify, async (req, res) => {
  const id = req.user._id;
  try {
    Project.find({}, async (err, result) => {
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

module.exports = router;
