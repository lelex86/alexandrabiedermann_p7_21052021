const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const limit = require("../middleware/limit");

const articleCtrl = require("../controllers/article");

router.get("/", auth, limit.apiLimiter, articleCtrl.getAllArticle);
router.post("/", auth, limit.apiLimiter, multer, articleCtrl.createArticle);
router.get("/:id", auth, limit.apiLimiter, articleCtrl.getOneArticle);
router.put("/:id", auth, limit.apiLimiter, multer, articleCtrl.modifyArticle);
router.delete("/:id", auth, limit.apiLimiter, articleCtrl.deleteArticle);
router.post("/:id/like", auth, limit.apiLimiter, articleCtrl.likeArticle);

module.exports = router;
