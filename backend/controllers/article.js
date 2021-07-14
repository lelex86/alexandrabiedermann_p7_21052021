const Article = require("../models/article");
const fs = require("fs");
const jwt = require("jsonwebtoken");

exports.createArticle = (req, res, next) => {
  if (req.file) {
    const article = {
      ...req.body,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    };
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
  Article.searchByAuthor(req.params.user_id, (err, results) => {
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
        const article = results[0];
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decodedToken.userId;
        if (userId == article.user_id) {
          if (article.imageUrl != null) {
            const filename = article.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
              const articleObject = {
                ...req.body,
                imageUrl: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
                }`,
                id: req.params.id,
              };
              Article.update(articleObject, (err, results) => {
                if (err) {
                  res.status(500).send(err);
                } else {
                  res.status(200).json(results);
                }
              });
            });
          } else {
            const articleObject = {
              ...req.body,
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
              id: req.params.id,
            };
            Article.update(articleObject, (err, results) => {
              if (err) {
                res.status(500).send(err);
              } else {
                res.status(200).json(results);
              }
            });
          }
        } else {
          res.status(401).json({ error: "L'utilisateur n'a pas le droit de modifier cet article!" });
        }
      }
    });
  } else {
    Article.update(req.body, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decodedToken.userId;
        if (userId == req.body.user_id) {
          res.status(200).json(results);
        } else {
          res.status(401).json({ error: "L'utilisateur n'a pas le droit de modifier cet article!" });
        }
      }
    });
  }
};

exports.deleteArticle = (req, res, next) => {
  Article.searchById(req.params.id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
      const userId = decodedToken.userId;
      if (userId == req.params.user_id || req.params.isAdmin == 1) {
        if (results[0].imageUrl != null) {
          const filename = results[0].imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            Article.delete(req.params.id, (err, results) => {
              if (err) {
                res.status(500).send(err);
              } else {
                res.status(200).json(results);
              }
            });
          });
        } else {
          Article.delete(req.params.id, (err, results) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).json(results);
            }
          });
        }
      } else {
        res.status(401).json({ error: "L'utilisateur n'a pas le droit de supprimer cet article!" });
      }
    }
  });
};

exports.deleteWithUser = (req, res, next) => {
  let user_id = req.params.id;
  Article.searchByAuthor(user_id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      for (let result of results) {
        if (result.imageUrl != null) {
          const filename = result.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            Article.delete(result.id, (err, results) => {
              if (err) {
                console.error("une erreur s'est produite:", err);
              } else {
                console.log("Article" + result.title + "supprimé!");
              }
            });
          });
        } else {
          Article.delete(result.id, (err, results) => {
            if (err) {
              console.error("une erreur s'est produite:", err);
            } else {
              console.log("Article" + result.title + "supprimé!");
            }
          });
        }
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
