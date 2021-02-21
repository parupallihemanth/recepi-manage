const bcrypt = require("bcrypt");
const expressJwt = require("express-jwt");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const sendGrid = require("nodemailer-sendgrid-transport");

const db = require("../DB/dbConnection");
const generateToken = require("../Utils/tokenGeneration");

const transport = nodemailer.createTransport(
  sendGrid({
    auth: {
      api_key: process.env.SENDGRID_API,
    },
  })
);

exports.register = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()[0].msg });
  }
  let { name, email, password } = req.body;
  try {
    // first check user exists or not
    let userexists = await db.query("select * from users where email=$1", [
      email,
    ]);
    if (userexists.rows.length !== 0) {
      errors = new Error("User already registered");
      errors.statusCode = 400;
      throw errors;
    }

    // encrypt the password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    let newUser = await db.query(
      "INSERT INTO users(name, email,password) values( $1,$2,$3) RETURNING name, email",
      [name, email, password]
    );

    if (newUser.rows.length !== 1) {
      errors = new Error("User registration failed");
      errors.statusCode = 400;
      throw errors;
    }

    res.status(200).json(newUser.rows[0]);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()[0].msg });
  }
  const { email, password } = req.body;
  console.log(email, password);
  try {
    let userexists = await db.query("select * from users where email=$1", [
      email,
    ]);
    if (userexists.rows.length === 0) {
      errors = new Error("User not found, please register first");
      errors.statusCode = 400;
      throw errors;
    }

    let checkpassword = await bcrypt.compare(
      password,
      userexists.rows[0].password
    );

    if (!checkpassword) {
      errors = new Error("email or password incorrect");
      errors.statusCode = 400;
      throw errors;
    }

    userexists.rows[0].password = undefined;
    const newLogin = await db.query(
      "insert into login_history(user_id) values($1)",
      [userexists.rows[0].user_id]
    );

    console.log(newLogin.rows);

    res.status(200).json({
      data: userexists.rows[0],
      token: generateToken(userexists.rows[0].user_id),
    });
    let sendMail = await transport.sendMail({
      to: "babuparupalli@gmail.com",
      from: "no-replay@test.com",
      subject: "welcome",
      html: "<h1>Welcome to rms</h1>",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.isSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile.user_id == req.auth.id;
  if (!checker) {
    return res.status(400).json({
      error: "ACCESS DENIED!",
    });
  }

  next();
};
