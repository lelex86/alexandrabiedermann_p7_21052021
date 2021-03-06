const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const commentCtrl = require("../controllers/comment");
const limit = require("../middleware/limit");

router.post("/", auth, limit.apiLimiter, commentCtrl.createComment);
router.put("/:id", auth, limit.apiLimiter, commentCtrl.modifyComment);
router.delete("/:id/:isAdmin", auth, limit.apiLimiter, commentCtrl.deleteComment);
router.get("/article/:article_id", auth, limit.apiLimiter, commentCtrl.getByArticle);
router.get("/user/:user_id", auth, limit.apiLimiter, commentCtrl.getByAuthor);
router.get("/:id", auth, limit.apiLimiter, commentCtrl.getById);

module.exports = router;
