const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");
const User = require("../models/user");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User ({
        username: req.body.username,
        userfirstname: req.body.userfirstname,
        email: CryptoJS.HmacSHA256(
          req.body.email,
          process.env.EMAIL
        ).toString(),
        emailAES: CryptoJS.AES.encrypt(
          req.body.email,
          process.env.EMAIL
        ).toString(),
        password: hash,
      });
      let sql = `INSERT INTO users SET ?`;
      let query = User.db.query(sql, user, (err, results) => {
          if(err) {
              res.status(400).send(err);
          } else {
              res.status(200).json(results);
          };
      });
    })
    .catch((error) => res.status(500).json({ error }));
};