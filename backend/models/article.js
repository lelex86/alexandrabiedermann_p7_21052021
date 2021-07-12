const db = require("../config/db");

class Article {
  static create = (article, callback) => {
    db.query(
      "INSERT INTO articles SET title=?, body=?, imageUrl=?, user_id=?",
      [article.title, article.body, article.imageUrl, article.user_id],
      (error, result) => {
        callback(error, result);
      }
    );
  };

  static searchByAuthor = (user_id, callback) => {
    db.query(
      "SELECT* FROM articles WHERE user_id=?",
      user_id,
      (error, result) => {
        callback(error, result);
      }
    );
  };

  static searchById = (id, callback) => {
    db.query(
      "SELECT articles.*, users.name, users.firstname FROM articles, users WHERE articles.id=? AND users.id=articles.user_id",
      id,
      (error, result) => {
        callback(error, result);
      }
    );
  };

  static update = (article, callback) => {
    if (article.imageUrl) {
      db.query(
        "UPDATE articles SET title=?, body=?, imageUrl=?, user_id=? WHERE id=?",
        [
          article.title,
          article.body,
          article.imageUrl,
          article.user_id,
          article.id,
        ],
        (error, result) => {
          callback(error, result);
        }
      );
    } else {
      db.query(
        "UPDATE articles SET title=?, body=?, user_id=? WHERE id=?",
        [article.title, article.body, article.user_id, article.id],
        (error, result) => {
          callback(error, result);
        }
      );
    }
  };

  static delete = (id, callback) => {
    db.query("DELETE FROM articles WHERE id=?", id, (error, result) => {
      callback(error, result);
    });
  };

  static searchAll = (callback) => {
    db.query(
      "SELECT articles.*, users.name, users.firstname FROM articles, users WHERE users.id=articles.user_id ORDER BY articles.created_at DESC",
      (error, result) => {
        callback(error, result);
      }
    );
  };
}

module.exports = Article;
