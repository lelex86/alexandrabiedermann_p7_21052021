const db = require("../config/db");

class Like {
  static create = (like, callback) => {
    db.query(
      "INSERT INTO likes SET user_id=?, article_id=?, likes=?, dislikes=?",
      [like.user_id, like.article_id, like.likes, like.dislikes],
      (error, result) => {
        callback(error, result);
      }
    );
  };

  static delete = (user_id, article_id, callback) => {
    db.query(
      "DELETE FROM likes WHERE user_id=? AND article_id=?",
      [user_id, article_id],
      (error, result) => {
        callback(error, result);
      }
    );
  };

  static searchLikeByArticle = (article_id, callback) => {
    db.query(
      "SELECT* FROM likes WHERE article_id=?",
      article_id,
      (error, result) => {
        callback(error, result);
      }
    );
  };

  static searchLikeByUser = (user_id, callback) => {
    db.query("SELECT* FROM likes WHERE user_id=?", user_id, (error, result) => {
      callback(error, result);
    });
  };

  static sumLike = (article_id, callback) => {
    db.query(
      "SELECT SUM(likes) AS somme FROM likes WHERE article_id=?",
      article_id,
      (error, result) => {
        callback(error, result);
      }
    );
  };

  static sumDislike = (article_id, callback) => {
    db.query(
      "SELECT SUM(dislikes) AS somme FROM likes WHERE article_id=?",
      article_id,
      (error, result) => {
        callback(error, result);
      }
    );
  };
}

module.exports = Like;
