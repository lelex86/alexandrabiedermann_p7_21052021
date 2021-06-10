const db = require("../config/db");

class Comment {
  static create = (comment, callback) => {
    db.query(
      "INSERT INTO commentaires SET author=?, article=?, commentaire=?",
      [comment.author, comment.article, comment.commentaire],
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
      "UPDATE FROM commentaires SET commentaire=? WHERE id=?",
      [comment.commentaire,
       comment.id],
      (error, result) => {
        callback(error, result);
      }
    );
  };

  static searchById = (id, callback) => {
    db.query(
      "SELECT* FROM commentaires WHERE id=?",
      id,
      (error, result) => {
        callback(error, result);
      }
    );
  };

  static searchByUser = (user, callback) => {
    db.query(
      "SELECT* FROM commentaires WHERE author=?",
      user,
      (error, result) => {
        callback(error, result);
      }
    );
  };

  static searchAll = (callback) => {
    db.query("SELECT* FROM commentaires", (error, result) => {
      callback(error, result);
    });
  };
}

module.exports = Comment;
