const db = require("../config/db");

class Like {
  static create = (like, callback) => {
    db.query(
      "INSERT INTO likes SET user=?, article=?, like=?, dislike=?",
      [
        like.user,
        like.article,
        like.like,
        like.dislike
      ],
      (error, result) => {
        callback(error, result);
      }
    );
  };


  static delete = (user, callback) => {
    db.query(
      "DELETE FROM likes WHERE user=?",
      user,
      (error, result) => {
        callback(error, result);
      }
    );
  };

  static searchLike = (callback) => {
    db.query("SELECT* FROM like WHERE like=true", (error, result) => {
      callback(error, result);
    });
  };

  static searchDislike = (callback) => {
    db.query("SELECT* FROM like WHERE dislike=true", (error, result) => {
      callback(error, result);
    });
  };
}

module.exports = Like;