const db = require("../config/db");
const sanitize = require("sanitize-html");

class Comment {
  static create = (comment, callback) => {
    db.query(
      "INSERT INTO commentaires SET user_id=?, article_id=?, commentaire=?",
      [
        comment.user_id,
        comment.article_id,
        sanitize(comment.commentaire, {
          allowedTags: [],
          allowedAttributes: {},
        }),
      ],
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
      [
        sanitize(comment.commentaire, {
          allowedTags: [],
          allowedAttributes: {},
        }),
        comment.id,
      ],
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
      "SELECT commentaires.*, users.name, users.firstname FROM commentaires, users WHERE commentaires.article_id=? AND users.id=commentaires.user_id",
      article_id,
      (error, result) => {
        callback(error, result);
      }
    );
  };
}

module.exports = Comment;
