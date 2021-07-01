const Article = require("../models/article");
const Like = require("../models/like");
const jwt = require("jsonwebtoken");

exports.like = (req, res, next) => {
  Like.create(req.body, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).json(results);
    }
  });
};

exports.dislike = (req, res, next) => {
  Like.create(req.body, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).json(results);
    }
  });
};

exports.undo = (req, res, next) => {
  Like.delete(req.params.user_id, req.params.article_id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

exports.countLike = (req, res, next) => {
  Like.sumLike(req.params.article_id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

exports.countDislike = (req, res, next) => {
  Like.sumDislike(req.params.article_id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getLikeByArticle = (req, res, next) => {
  Like.searchLikeByArticle(req.params.article_id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getLikeByUser = (req, res, next) => {
  Like.searchLikeByUser(req.params.user_id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};
