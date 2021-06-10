const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const limit = require("../middleware/limit");

const articleCtrl = require("../controllers/article");

router.get("/", auth, limit.apiLimiter, articleCtrl.getAll);
router.post("/", auth, limit.apiLimiter, multer, articleCtrl.createArticle);
router.get("/:id", auth, limit.apiLimiter, articleCtrl.getOne);
router.get("/user/:id", auth, limit.apiLimiter, articleCtrl.getByAuthor);
router.put("/:id", auth, limit.apiLimiter, multer, articleCtrl.modifyArticle);
router.delete("/:id", auth, limit.apiLimiter, articleCtrl.deleteArticle);

module.exports = router;
