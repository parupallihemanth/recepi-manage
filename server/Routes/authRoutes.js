const express = require("express");
const { register, login } = require("../Controllers/authControllers");
const { check, validationResult } = require("express-validator");

const router = express.Router();

router.post(
  "/register",
  [
    check("name", "Name should have minimum 3 char").isLength({ min: 3 }),
    check("email", "Email required").isEmail(),
    check("password", "password should have minimum 3 char").isLength({
      min: 3,
    }),
  ],
  register
);
router.post("/login", [check("email", "Email required").isEmail()], login);

module.exports = router;
