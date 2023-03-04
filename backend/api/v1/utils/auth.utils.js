let jwt = require("jsonwebtoken");

exports.isAuthenticated = async function (req, res, next) {
  try {
    if (!req.session.user) {
      return res.errorBhejdo(HttpStatus.UNAUTHORIZED, {
        success: false,
        msg: "Could not identify user.",
      });
    }
    req.user = req.session.user;
    return next();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
