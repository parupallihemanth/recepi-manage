const express = require("express");
const {
  getUserById,
  getAUser,
  resetPassword,
} = require("../Controllers/userControllers");
const { isSignin, isAuthenticated } = require("../Controllers/authControllers");
const router = express.Router();

router.param("userId", getUserById);
router.get("/:userId", isSignin, isAuthenticated, getAUser);
router.put("/reset/:userId", isSignin, isAuthenticated, resetPassword);

module.exports = router;
