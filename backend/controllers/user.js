const bcrypt = require("bcrypt");
const User = require("../models/user");
const Article = require("./article");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      req.body.password = hash;
      User.create(req.body, (err, results) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(201).json(results);
        }
      });
    })
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};

exports.login = (req, res, next) => {
  User.searchByMail(req.body.email, (err, results) => {
    if (results.length == 0) {
      console.log("Utilisateur non trouvé");
      return res.status(401).json({ error: "Utilisateur non trouvé !" });
    } else {
      bcrypt
        .compare(req.body.password, results[0].password)
        .then((valid) => {
          if (!valid) {
            console.log("Mot de passe non valable!");
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          } else {
            console.log("connexion réussie!");
            res.status(200).json({
              userId: results[0].id,
              token: jwt.sign(
                { userId: results[0].id },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "24h",
                }
              ),
              isAdmin: results[0].isAdmin,
            });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    }
  });
};

exports.modify = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userId = decodedToken.userId;
  if (userId == req.params.id || req.params.isAdmin == 1) {
    if (req.body.password) {
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          req.body.password = hash;
          const newUser = {
            ...req.body,
            password: req.body.password,
            id: req.params.id,
          };
          User.update(newUser, (err, results) => {
            if (err) {
              res.status(400).send(err);
            } else {
              res.status(200).json(newUser);
            }
          });
        })
        .catch((error) =>
          res.status(500).json({
            error,
          })
        );
    } else {
      User.searchById(req.params.id, (err, results) => {
        if (err) {
          res.status(400).send(err);
        } else {
          const user = results[0];
          const newUser = {
            ...req.body,
            password: user.password,
            id: req.params.id,
          };
          User.update(newUser, (err, results) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).json(newUser);
            }
          });
        }
      });
    }
  } else {
    res.status(401).send({ error: "Utilisateur non autorisé!" });
  }
};

exports.delete = (req, res, next) => {
  Article.deleteWithUser(req);
  User.searchById(req.params.id, (err, results) => {
    const user = results[0];
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodedToken.userId;
    if (userId == user.id || req.params.isAdmin == 1) {
      id = req.params.id;
      User.delete(id, (err, results) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).json(results);
        }
      });
    } else {
      res.status(401).send(err);
    }
  });
};

exports.getOne = (req, res, next) => {
  User.searchById(req.params.id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

exports.getAll = (req, res, next) => {
  User.searchAll((err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};
