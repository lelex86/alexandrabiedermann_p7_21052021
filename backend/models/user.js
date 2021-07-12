const db = require("../config/db");

class User {
  static create = (user, callback) => {
    db.query(
      "INSERT INTO users SET name=?, firstname=?, email=?, password=?",
      [user.name, user.firstname, user.email, user.password],
      (error, result) => {
        callback(error, result);
      }
    );
  };

  static searchByMail = (email, callback) => {
    db.query("SELECT* FROM users WHERE email=?", email, (error, result) => {
      callback(error, result);
    });
  };

  static searchById = (id, callback) => {
    db.query("SELECT* FROM users WHERE id=?", id, (error, result) => {
      callback(error, result);
    });
  };

  static update = (user, callback) => {
    db.query(
      "UPDATE users SET name=?, firstname=?, email=?, password=?, isAdmin=? WHERE id=?",
      [
        user.name,
        user.firstname,
        user.email,
        user.password,
        user.isAdmin,
        user.id,
      ],
      (error, result) => {
        callback(error, result);
      }
    );
  };

  static delete = (id, callback) => {
    db.query("DELETE FROM users WHERE id=?", id, (error, result) => {
      callback(error, result);
    });
  };

  static searchAll = (callback) => {
    db.query("SELECT* FROM users", (error, result) => {
      callback(error, result);
    });
  };
}

module.exports = User;
