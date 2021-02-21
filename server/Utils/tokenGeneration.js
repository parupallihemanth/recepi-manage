const jwt = require("jsonwebtoken");

const tokenGenerate = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2D" });
};

module.exports = tokenGenerate;
