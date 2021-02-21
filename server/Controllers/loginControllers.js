const db = require("../DB/dbConnection");

exports.getLogin = async (req, res, next) => {
  try {
    const login_history = await db.query(
      "select * from login_history where user_id=$1",
      [req.params.userId]
    );

    if (login_history.rows.length === 0) {
      const error = new Error("problem in showing the login history");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json(login_history.rows);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    // console.log(err);
  }
};
