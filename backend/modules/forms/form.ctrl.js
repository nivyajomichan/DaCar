const formService = require("./form.services");

exports.getMasterData = getMasterData;
exports.putNewCarData = putNewCarData;

async function getMasterData(req, res, next) {
  try {
    let data = await formService.getMasterData();
    return res.bhejdo(HttpStatus.OK, { success: true, data: data });
  } catch (err) {
    console.log(err);
    return res.errorBhejdo(500, {
      success: false,
      msg: "Internal Server Error",
    });
  }
}

async function putNewCarData(req, res, next) {
  try {
    const user = req.session.user;
    let data = await formService.putNewCarData(req.body, {
      id: user.user_id,
      name: user.first_name,
    });
    return res.bhejdo(HttpStatus.OK, {
      success: true,
      msg: data,
    });
  } catch (err) {
    console.log(err);
    return res.errorBhejdo(500, {
      success: false,
      msg: "Internal Server Error",
    });
  }
}
