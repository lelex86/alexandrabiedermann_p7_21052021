const db = require("../config/db");
const sanitize = require("../config/sanitize");

class Article {
  static create = (article, callback) => {
    db.query(
      "INSERT INTO articles SET article_title=?, article_body=?, imageUrl=?, author=?, created_at=?",
      [
        article.title,
        article.body,
        article.imageUrl,
        article.author,
        article.date,
      ],
      (error, result) => {
        callback(error, result);
      }
    );
  };

  static searchByAuthor = (author, callback) => {
    db.query(
      "SELECT* FROM articles WHERE author=?",
      author,
      (error, result) => {
        callback(error, result);
      }
    );
  };

  static searchById = (article_id, callback) => {
    db.query(
      "SELECT* FROM articles WHERE article_id=?",
      article_id,
      (error, result) => {
        callback(error, result);
      }
    );
  };

  static update = (article, callback) => {
    db.query(
      "UPDATE articles SET article_title=?, article_body=?, imageUrl=?, author=?, created_at=? WHERE article_id=?",
      [
        article.title,
        article.body,
        article.image,
        article.author,
        article.date,
        article.article_id
      ],
      (error, result) => {
        callback(error, result);
      }
    );
  };

  static delete = (article_id, callback) => {
    db.query(
      "DELETE FROM articles WHERE article_id=?",
      article_id,
      (error, result) => {
        callback(error, result);
      }
    );
  };

  static searchAll = (callback) => {
    db.query("SELECT* FROM articles", (error, result) => {
      callback(error, result);
    });
  };
}

module.exports = Article;
