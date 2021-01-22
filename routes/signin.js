const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verify = require("./verify_token");

router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    profilePhoto: req.body.profilePhoto,
  });
  try {
    User.findOne({ email: req.body.email }, async (err, result) => {
      if (err) {
        res.status(200).send({
          error: "An Error Occured Please try after sometime",
          message: "",
        });
      }
      if (!result) {
        const savedUser = await user.save();
        res.status(201).send({
          error: "",
          message: "User created Successfully",
        });
      } else {
        res.status(200).send({
          error: "Email Taken",
          message: "",
        });
      }
    });
  } catch (err) {
    res.status(200).send(err);
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    console.log("Email error");
    return res.status(400).send({ error: "Email not found" });
  }
  const validPass = await bcrypt.compare(req.body.password, user.password);
  // const password = req.body.password;
  if (!validPass) {
    // console.log(password + " " + user.password);
    return res.status(200).send({ error: "Incorrect password" });
  }

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN);
  // console.log(res.header);
  res.status(200).send({
    error: "",
    message: "Logged in Successfully",
    auth_token: token,
    Name: user.name,
    email: user.email,
    photo: user.profilePhoto,
  });
});

router.get("/get-all-users", verify, async (req, res) => {
  const id = req.user._id;
  try {
    User.find({}, async (err, result) => {
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
