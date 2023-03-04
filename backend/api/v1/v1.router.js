const express = require("express");
const router = express.Router();
const pythonRouter = require("./routers/python.router");

const formCtrl = require("../../modules/forms/form.ctrl");
const logCtrl = require("../../modules/logs/logs.ctrl");
const authUtils = require("./utils/auth.utils");

router.get("/status", (req, res, next) => {
  res.status(200).send({ success: true, msg: "Server Working" });
});

router.get("/dataforforms", formCtrl.getMasterData);
router.post("/carinfo", formCtrl.putNewCarData);

router.get("/userlogs", logCtrl.getLogs);
router.put("/editlogs/:log_id", logCtrl.editLogs);

module.exports = router;
