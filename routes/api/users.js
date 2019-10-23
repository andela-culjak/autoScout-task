const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const fs = require("fs");

//@route  POST api/users
//@desc   Submitting form data
router.post(
  "/",
  [
    check("firstName", "First name required")
      .not()
      .isEmpty(),
    check("lastName", "Last name required")
      .not()
      .isEmpty(),
    check("address", "Address required")
      .not()
      .isEmpty(),
    check("phone", "Phone required")
      .not()
      .isEmpty(),
    //check("Phone", "Bad format").isMobilePhone(), NEED TO FIX
    check("email", "Email required")
      .not()
      .isEmpty(),
    //check("Email", "Bad format").isEmail(),
    check("terms", "Must be boolean").isBoolean() //NEED TO FIX (convert to string?)
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
