const express = require("express");
const router = express.Router();
const User = require("../models/User");

const { body, validationResult } = require("express-validator");

//Creating User using POST: /api/auth

router.post(
  "/",
  [
    body("name", "Enter Valid Name").isLength({ min: 5 }),
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password should be minimum 5 Characters long.").isLength({
      min: 5,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
      });
  }
);

module.exports = router;
