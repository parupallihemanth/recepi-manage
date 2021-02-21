const bcrypt = require("bcrypt");
const db = require("../DB/dbConnection");

exports.getUserById = async (req, res, next, id) => {
  try {
    const user = await db.query("select * from users where user_id=$1", [id]);
    if (user.rows.length === 0) {
      const error = new Error("User not found");
      error.statusCode = 400;
      throw error;
    }

    req.profile = user.rows[0];
    next();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAUser = (req, res) => {
  console.log(req.auth);
  return res.status(200).json(req.profile);
};

exports.resetPassword = async (req, res, next) => {
  let { password } = req.body;
  console.log(password);
  try {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    let user = await db.query("update users set password=$1 where user_id=$2", [
      password,
      req.params.userId,
    ]);
    if (user.rows.length !== 0) {
      errors = new Error("password reset failed");
      errors.statusCode = 400;
      throw errors;
    }
    res.status(200).json("updation success");
  } catch (err) {
    // if (!err.statusCode) {
    //   err.statusCode = 500;
    // }
    // next(err);
    console.log(err);
  }
};
