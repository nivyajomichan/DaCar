const userServices = require("./users.services");
const logUtils = require("../../api/v1/utils/logger.utils");

exports.googleSignIn = googleSignIn;
exports.logout = logout;

async function googleSignIn(req, res, next) {
  try {
    let data = await userServices.signUp(req.body.profileObj);
    const sess = req.session;
    sess.user = data;
    return res.bhejdo(HttpStatus.OK, { success: true, data });
  } catch (err) {
    console.log(err);
    return res.bhejdo(HttpStatus.INTERNAL_SERVER_ERROR, {
      success: false,
      err: err,
    });
  }
}

async function logout(req, res, next) {
  try {
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
      return res.bhejdo(HttpStatus.OK, {
        success: true,
        msg: "User Logged Out.",
      });
    });
  } catch (err) {
    console.log(err);
    return res.bhejdo(HttpStatus.INTERNAL_SERVER_ERROR, {
      success: false,
      err: err,
    });
  }
}
