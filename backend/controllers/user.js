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
    if (req.body.email != results[0].email) {
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
            });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    }
  });
};

exports.modify = (req, res, next) => {
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
            res.status(200).json(results);
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
        console.log("erreur", err);
      } else {
        const user = results[0];
        const newUser = {
          ...req.body,
          password: user.password,
          id: req.params.id,
        };
        User.update(newUser, (err, results) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).json(newUser);
          }
        });
      }
    });
  }
};

exports.delete = (req, res, next) => {
  Article.deleteWithUser(req);
  User.searchById(req.params.id, (err, results) => {
    id = req.params.id;
    User.delete(id, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(results);
      }
    });
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
