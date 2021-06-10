const Article = require("../models/article");
const fs = require("fs");
const jwt = require("jsonwebtoken");

exports.createArticle = (req, res, next) => {
  if (req.file) {
    const article = new Article({
      ...req.body,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    });
    Article.create(article, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).json(results);
      }
    });
  } else {
    Article.create(req.body, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).json(results);
      }
    });
  }
};

exports.getOne = (req, res, next) => {
  Article.searchById(req.params.id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getByAuthor = (req, res, next) => {
  Article.searchByAuthor(req.params.id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

exports.modifyArticle = (req, res, next) => {
  if (req.file) {
    Article.searchById(req.params.id, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        const filename = article.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          const articleObject = {
            ...req.body,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
            article_id: req.params.id
          };
          Article.update(articleObject, (err, results) => {
            if (err) {
              res.status(400).send(err);
            } else {
              res.status(200).json(results);
            }
          });
        });
      }
    });
  } else {
    Article.update(req.body, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(results);
      }
    });
  }
};

exports.deleteArticle = (req, res, next) => {
  Article.searchById(req.params.id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      const article = results[0];
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
      const userId = decodedToken.userId;
      if (userId == article.author) {
        if (article.imageUrl != null) {
          const filename = article.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            Article.delete(req.params.id, (err, results) => {
              if (err) {
                res.status(400).send(err);
              } else {
                res.status(200).json(results);
              }
            });
          });
        } else {
          Article.delete(req.params.id, (err, results) => {
            if (err) {
              res.status(400).send(err);
            } else {
              res.status(200).json(results);
            }
          });
        }
      } else {
        console.log("L'utilisateur n'a pas le droit de supprimer cette sauce!");
        res.status(401).json(err);
      }
    }
  });
};

exports.getAll = (req, res, next) => {
  Article.searchAll((err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};
