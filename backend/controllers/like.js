const Article = require("../models/article");
const Like = require("../models/like");
const jwt = require("jsonwebtoken");

exports.like = (req, res, next) => {
  console.log("req", req.body);

    Like.create(req.body, (err, results) => {
        if (err) {
          console.log(err);
            res.status(400).send(err);
          } else {
            res.status(201).json(results);
          };
    })

}

exports.dislike = (req, res, next) => {

    Like.create(req.body, (err, results) => {
        if (err) {
            res.status(400).send(err);
          } else {
            res.status(201).json(results);
          };
    })
}

exports.undo = (req, res, next) => {

    Like.delete (req.body, (err, results) => {
        if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).json(results);
          };
    });
}