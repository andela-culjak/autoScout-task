const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const fs = require("fs");

//@route  POST api/users
//@desc   Submitting form data
router.post(
  "/",
  [
    check("First name", "First name required")
      .not()
      .isEmpty(),
    check("Last name", "Last name required")
      .not()
      .isEmpty(),
    check("Address", "Address required")
      .not()
      .isEmpty(),
    check("Phone", "Phone required")
      .not()
      .isEmpty(),
    check("Phone", "Bad format").isMobilePhone(), //NEED TO FIX
    check("Email", "Email required")
      .not()
      .isEmpty(),
    check("Email", "Bad format").isEmail(),
    check("Terms", "Must be boolean").isBoolean() //NEED TO FIX (convert to string?)
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send(req.body); //Just for test

    const data = JSON.stringify(req.body);
    const path = `${process.cwd()}/client/public/test.txt`;

    fs.writeFile(path, data, err => {
      if (err) {
        console.error(err); //FIX THIS
        return;
      }

      console.log("Form submitted");
    });
  }
);

module.exports = router;
