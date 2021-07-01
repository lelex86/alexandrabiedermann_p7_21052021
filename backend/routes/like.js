const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const likeCtrl = require("../controllers/like");
const limit = require("../middleware/limit");

router.post("/like", auth, limit.apiLimiter, likeCtrl.like);
router.post("/dislike", auth, limit.apiLimiter, likeCtrl.dislike);
router.delete("/undo/:user_id/:article_id", auth, limit.apiLimiter, likeCtrl.undo);
router.get("/like/:article_id", auth, limit.apiLimiter, likeCtrl.countLike);
router.get("/dislike/:article_id", auth, limit.apiLimiter, likeCtrl.countDislike);
router.get("/article/:article_id", auth, limit.apiLimiter, likeCtrl.getLikeByArticle);
router.get("/user/:user_id", auth, limit.apiLimiter, likeCtrl.getLikeByUser);
module.exports = router;