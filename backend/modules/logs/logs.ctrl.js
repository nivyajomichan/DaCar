const logsService = require("./logs.services");

exports.getLogs = getLogs;
exports.editLogs = editLogs;

async function getLogs(req, res, next) {
  try {
    const user = req.session.user;
    let data = await logsService.getLogs({
      id: user.user_id,
      name: user.first_name,
    });
    return res.bhejdo(HttpStatus.OK, { success: true, data: data });
  } catch (err) {
    console.log(err);
    return res.errorBhejdo(500, {
      success: false,
      msg: "Internal Server Error",
    });
  }
}

async function editLogs(req, res, next) {
  try {
    let log_id = req.params.log_id;
    let updateLogs = await logsService.editLogs(req.body, log_id);
    return res.bhejdo(HttpStatus.OK, {
      success: true,
      msg: "Updated Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.errorBhejdo(500, {
      success: false,
      msg: "Internal Server Error",
    });
  }
}
