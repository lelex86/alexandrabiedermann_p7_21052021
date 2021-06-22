const db = require("../config/db");

class Like {
  static create = (like, callback) => {
    db.query(
      "INSERT INTO likes SET user_id=?, article_id=?, like=?, dislike=?",
      [
        like.user_id,
        like.article_id,
        like.like,
        like.dislike
      ],
      (error, result) => {
        callback(error, result);
      }
    );
  };


  static delete = (user_id, callback) => {
    db.query(
      "DELETE FROM likes WHERE user_id=?",
      user_id,
      (error, result) => {
        callback(error, result);
      }
    );
  };

  static searchLike = (callback) => {
    db.query("SELECT* FROM like WHERE like=1", (error, result) => {
      callback(error, result);
    });
  };

  static sumLike = (callback) => {
    db.query("SELECT SUM (like) FROM like", (error, result) => {
      callback(error, result);
    });
  };

  static sumDislike = (callback) => {
    db.query("SELECT SUM (like) FROM like", (error, result) => {
      callback(error, result);
    });
  };
}

module.exports = Like;