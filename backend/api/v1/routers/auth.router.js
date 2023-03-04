const express = require("express");
const router = express.Router();
const UserCtrl = require("../../../modules/users/users.ctrl");

router.post("/googleSignUp", UserCtrl.googleSignIn);
router.post("/logout", UserCtrl.logout);

module.exports = router;
