const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const commentCtrl = require("../controllers/comment");
const limit = require("../middleware/limit");

router.post("/", auth, limit.apiLimiter, commentCtrl.createComment);
router.put("/:id", auth, limit.apiLimiter, commentCtrl.modifyComment);
router.delete("/:id", auth, limit.apiLimiter, commentCtrl.deleteComment);
router.get("/", auth, limit.apiLimiter, commentCtrl.getAll);
router.get("/:id", auth, limit.apiLimiter, commentCtrl.getByAuthor);

module.exports = router;