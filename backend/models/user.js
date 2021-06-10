const db = require("../config/db");

class User {
  static create = (user, callback) => {
    db.query(
      "INSERT INTO users SET userName=?, userFirstname=?, email=?, password=?",
      [user.userName, user.userFirstname, user.email, user.password],
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

  static searchById = (user_id, callback) => {
    db.query("SELECT* FROM users WHERE user_id=?", user_id, (error, result) => {
      callback(error, result);
    });
  };

  static update = (user, callback) => {
    db.query(
      "UPDATE users SET userName=?, userFirstname=?, email=?, password=? WHERE user_id=?",
      [
        user.userName,
        user.userFirstname,
        user.email,
        user.password,
        user.user_id,
      ],
      (error, result) => {
        callback(error, result);
      }
    );
  };

  static delete = (user_id, callback) => {
    db.query("DELETE FROM users WHERE user_id=?", user_id, (error, result) => {
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
