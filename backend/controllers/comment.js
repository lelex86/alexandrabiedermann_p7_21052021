const Article = require("../models/article");
const Comment = require("../models/comment");
const jwt = require("jsonwebtoken");

exports.createComment = (req, res, next) => {
  Comment.create(req.body, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).json(results);
    }
  });
};

exports.modifyComment = (req, res, next) => {
  Comment.searchById(req.params.id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      const comment = results[0];
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
      const userId = decodedToken.userId;
      if (userId == comment.user_id) {
        const commentObject = {
          ...req.body,
          id: req.params.id,
        };
        Comment.update(commentObject, (err, results) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).json(results);
          }
        });
      } else {
        res.status(401).send(err);
      }
    }
  });
};

exports.deleteComment = (req, res, next) => {
  Comment.searchById(req.params.id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      const comment = results[0];
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
      const userId = decodedToken.userId;
      if (userId == comment.user_id) {
        Comment.delete(req.params.id, (err, results) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).json(results);
          }
        });
      } else {
        res.status(401).send(err);
      }
    }
  });
};

exports.getByArticle = (req, res, next) => {
  Comment.searchByArticle(req.params.article_id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getByAuthor = (req, res, next) => {
  Comment.searchByUser(req.params.user_id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};
