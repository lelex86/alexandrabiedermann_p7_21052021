const db = require("../config/db");

class Comment {
  static create = (comment, callback) => {
    db.query(
      "INSERT INTO commentaires SET user_id=?, article_id=?, commentaire=?",
      [comment.user_id, comment.article_id, comment.commentaire],
      (error, result) => {
        callback(error, result);
      }
    );
  };

  static delete = (id, callback) => {
    db.query("DELETE FROM commentaires WHERE id=?", id, (error, result) => {
      callback(error, result);
    });
  };

  static update = (comment, callback) => {
    db.query(
      "UPDATE commentaires SET commentaire=? WHERE id=?",
      [comment.commentaire, comment.id],
      (error, result) => {
        callback(error, result);
      }
    );
  };

  static searchById = (id, callback) => {
    db.query("SELECT* FROM commentaires WHERE id=?", id, (error, result) => {
      callback(error, result);
    });
  };

  static searchByUser = (user, callback) => {
    db.query(
      "SELECT articles.*, commentaires.* FROM commentaires,articles WHERE commentaires.user_id=? AND articles.id=commentaires.article_id",
      user,
      (error, result) => {
        callback(error, result);
      }
    );
  };

  static searchByArticle = (article_id, callback) => {
    db.query(
      "SELECT commentaires.*, users.* FROM commentaires, users WHERE commentaires.article_id=? AND users.id=commentaires.user_id",
      article_id,
      (error, result) => {
        callback(error, result);
      }
    );
  };
}

module.exports = Comment;
