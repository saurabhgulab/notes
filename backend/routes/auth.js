const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const bcrypt = require("bcrypt"); //hashing and salting to secure our database.
var jwt = require("jsonwebtoken"); //providing session id's to the secure client-server communication
//importing express middleware for validation purposes.
const { body, validationResult } = require("express-validator");

const JWT_SECRET = "Secret Key Pro Max";
// ROUTE 1: Creating User using POST: /api/auth/createuser. No login required.
router.post(
  "/createuser",
  [
    body("name", "Enter Valid Name").isLength({ min: 5 }),
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password should be minimum 5 Characters long.").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //Return bad request on Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email }); //checking duplicate email
      if (user) {
        return res
          .status(400)
          .json({ error: "User with same email already exists" });
      }

      //applying hashing to current password. Also using async-await structure
      const salt = await bcrypt.genSalt(10);
      const securedPasswrd = await bcrypt.hashSync(req.body.password, salt);

      //creation of new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPasswrd,
      });

      //payload
      const data = { user: { id: user.id } };
      const jwtData = jwt.sign(data, JWT_SECRET);

      res.json({ jwtData });
      //   .then((user) => res.json(user))
      //   .catch((err) => {
      //     console.log(err);
      //   });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 2: Authenticate a user with email and password. POST: /api/auth/login
router.post(
  "/login",
  [
    body("email", "Invalid Credentils").isEmail(),
    body("password", "Invalid Credentils").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json("Invalid Credentials");
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json("Invalid Credentials");
      }

      //payload
      const data = { user: { id: user.id } };
      const jwtData = jwt.sign(data, JWT_SECRET);

      res.json({ jwtData });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3: Get user details . POST: /api/auth/getuser. Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
