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
    check("email", "Email required")
      .not()
      .isEmpty(),
    check("email", "Bad email format").isEmail(),
    check(
      "terms",
      "Must be of age and agree to terms in order to proceed"
    ).equals("true")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = JSON.stringify(req.body);
    const path = `${process.cwd()}/test.txt`;

    await fs.writeFile(path, data, err => {
      if (err) {
        console.error(err);
        return;
      }
    });
    res.send(req.body);
  }
);

module.exports = router;
