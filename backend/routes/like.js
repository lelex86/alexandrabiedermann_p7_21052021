const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const likeCtrl = require("../controllers/like");
const limit = require("../middleware/limit");

router.post("/like", auth, limit.apiLimiter, likeCtrl.like);
router.post("/dislike", auth, limit.apiLimiter, likeCtrl.dislike);
router.delete("/undo", auth, limit.apiLimiter, likeCtrl.undo);
module.exports = router;