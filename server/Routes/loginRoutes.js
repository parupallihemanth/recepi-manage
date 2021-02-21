const express = require("express");
const { getUserById } = require("../Controllers/userControllers");
const { isSignin, isAuthenticated } = require("../Controllers/authControllers");
const { getLogin } = require("../Controllers/loginControllers");
const router = express.Router();

router.param("userId", getUserById);
router.get("/:userId", isSignin, isAuthenticated, getLogin);

module.exports = router;
