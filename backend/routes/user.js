const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user");
const limit = require("../middleware/limit");

router.post("/signup", limit.createAccountLimiter, userCtrl.signup);
router.post("/login", limit.loginLimiter, userCtrl.login);
router.put("/:id", auth, limit.apiLimiter, userCtrl.modify);
router.delete("/:id", auth, limit.apiLimiter, userCtrl.delete);
router.get("/:id", /* auth, */ limit.apiLimiter, userCtrl.getOne);
router.get("/", auth, limit.apiLimiter, userCtrl.getAll);
module.exports = router;
