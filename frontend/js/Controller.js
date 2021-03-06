/*********************************** Contantes réutilisées à de nombreuses reprises ***********************************/

const urlServer = "http://localhost:3000/api/";
const article_id = new URLSearchParams(window.location.search).get("id");

class Controller {
  /*********************************** Méthodes utiles dans plusieurs autres méthodes ***********************************/

  static getFormData(formData) {
    let objectData = {};
    formData.forEach(function (value, key) {
      objectData[key] = value;
    });
    return objectData;
  }

  static isAdmin() {
    if (localStorage.getItem("isAdmin")) {
      return 1;
    } else {
      return 0;
    }
  }

  static index() {
    let userId = localStorage.getItem("userId");
    if (userId > 0) {
      let view = new View();
      view.wall();
      if (document.location.href.indexOf("id") > -1) {
        Controller.getOneArticle();
      }
    } else {
      let view = new View();
      view.startPage();
    }
  }

  static inscription() {
    let view = new View();
    view.inscription();
  }

  static connexion() {
    let view = new View();
    view.connexion();
  }

  static deconnexion() {
    localStorage.clear();
    Controller.index();
  }

  static getTimeLaps(date) {
    let today = new Date();
    let publishDate = new Date(date);
    let diff = (today.getTime() - publishDate.getTime()) / 1000;
    if (diff < 60) {
      let rep = "moins d'une minute";
      return rep;
    } else if (diff > 60 && diff < 3600) {
      let time = diff / 60;
      let rep = "Il y a " + time.toFixed() + " minutes";
      return rep;
    } else if (diff > 3600 && diff < 86400) {
      let time = diff / 3600;
      let rep = "Il y a " + time.toFixed() + " heures";
      return rep;
    } else {
      let time = diff / 86400;
      let rep = "Il y a " + time.toFixed() + " jours";
      return rep;
    }
  }

  /*********************************** Méthodes gérant les utilisateurs ***********************************/

  static signup() {
    let url = urlServer + "user/signup";
    let formulaire = document.getElementById("formulaire");
    let data = new FormData(formulaire);
    let user = JSON.stringify(Controller.getFormData(data));
    Model.post(url, user)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        console.log("Utilisateur enregistré!");
        Controller.login();
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        if (error.status == 401) {
          localStorage.clear();
          Controller.index();
        } else {
          let view = new View();
          view.errorPage(error);
        }
      });
  }

  static login() {
    let url = urlServer + "user/login";
    let formulaire = document.getElementById("formulaire");
    let data = new FormData(formulaire);
    let user = JSON.stringify(Controller.getFormData(data));
    Model.post(url, user)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        console.log("Utilisateur connecté!");
        user = JSON.parse(response);
        localStorage.setItem("userToken", user.token);
        localStorage.setItem("userId", user.userId);
        if (user.isAdmin == 1) {
          localStorage.setItem("isAdmin", user.isAdmin);
        }
        let view = new View();
        view.wall();
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        let view = new View();
        view.errorPage(error);
      });
  }

  static modifyUser() {
    let formulaire = document.getElementById("formulaire");
    let data = new FormData(formulaire);
    let user = JSON.stringify(Controller.getFormData(data));
    let url =
      urlServer +
      "user/" +
      Controller.getFormData(data).id +
      "/" +
      Controller.isAdmin();
    Model.put(url, user)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        console.log("Utilisateur modifié!");
        if (localStorage.getItem("isAdmin")) {
          Controller.getAllUsers();
        } else {
          let view = new View();
          view.showProfil(JSON.parse(response));
        }
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        let view = new View();
        view.errorPage(error);
      });
  }

  static deleteUser() {
    const user_id = localStorage.getItem("userId");
    let url = urlServer + "user/" + user_id + "/" + Controller.isAdmin();
    Model.delete(url)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        console.log("Utilisateur supprimé!");
        localStorage.clear();
        Controller.index();
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        let view = new View();
        view.errorPage(error);
      });
  }

  static deleteUserByAdmin(userId) {
    const user_id = localStorage.getItem("userId");
    let url = urlServer + "user/" + userId + "/" + Controller.isAdmin();
    Model.delete(url)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        console.log("Utilisateur supprimé!");
        if (userId == user_id) {
          localStorage.clear();
          Controller.index();
        } else {
          Controller.getAllUsers();
        }
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        let view = new View();
        view.errorPage(error);
      });
  }

  static showProfil() {
    const user_id = localStorage.getItem("userId");
    let url = urlServer + "user/" + user_id;
    let user = Model.get(url)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        let view = new View();
        view.showProfil(JSON.parse(response)[0]);
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        if (error.status == 401) {
          localStorage.clear();
          Controller.index();
        } else {
          let view = new View();
          view.errorPage(error);
        }
      });
  }

  static getUser() {
    const user_id = localStorage.getItem("userId");
    let url = urlServer + "user/" + user_id;
    let user = Model.get(url)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        let view = new View();
        view.modifyUser(JSON.parse(response)[0]);
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        if (error.status == 401) {
          localStorage.clear();
          Controller.index();
        } else {
          let view = new View();
          view.errorPage(error);
        }
      });
  }

  static getUserByAdmin(userId) {
    let url = urlServer + "user/" + userId;
    let user = Model.get(url)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        let view = new View();
        view.modifyUser(JSON.parse(response)[0]);
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        if (error.status == 401) {
          localStorage.clear();
          Controller.index();
        } else {
          let view = new View();
          view.errorPage(error);
        }
      });
  }

  static getAllUsers() {
    let url = urlServer + "user/";
    Model.get(url)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        let view = new View();
        view.showUsers(JSON.parse(response));
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        if (error.status == 401) {
          localStorage.clear();
          Controller.index();
        } else {
          let view = new View();
          view.errorPage(error);
        }
      });
  }

  /*********************************** Méthodes gérant les articles ***********************************/

  static savePost(form, articleId) {
    let formData = new FormData(form);
    if (articleId) {
      var method = "PUT";
      var url = urlServer + "articles/" + articleId;
    } else {
      var method = "POST";
      var url = urlServer + "articles/";
    }
    Model.postFetch(formData, method, url)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        let view = new View();
        view.wall();
      })
      .catch(function (req) {
        console.error("Échec connexion API. Erreur=", req.responseText);
        if (error.status == 401) {
          localStorage.clear();
          Controller.index();
        } else {
          let view = new View();
          view.errorPage(req.responseText);
        }
      });
  }

  static getArticles() {
    let url = urlServer + "articles";
    let articles = Model.get(url)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        let view = new View();
        view.showArticles(JSON.parse(response));
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        if (error.status == 401) {
          localStorage.clear();
          Controller.index();
        } else {
          let view = new View();
          view.errorPage(error);
        }
      });
  }

  static getArticlesByUser() {
    const user_id = localStorage.getItem("userId");
    let url = urlServer + "articles/user/" + user_id;
    let article = Model.get(url)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        let view = new View();
        view.showArticlesByUser(JSON.parse(response));
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        if (error.status == 401) {
          localStorage.clear();
          Controller.index();
        } else {
          let view = new View();
          view.errorPage(error);
        }
      });
  }

  static getOneArticle() {
    let url = urlServer + "articles/" + article_id;
    let article = Model.get(url)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        let view = new View();
        view.showOneArticle(JSON.parse(response)[0]);
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        if (error.status == 401) {
          localStorage.clear();
          Controller.index();
        } else {
          let view = new View();
          view.errorPage(error);
        }
      });
  }

  static modifyArticle() {
    let url = urlServer + "articles/" + article_id;
    let article = Model.get(url)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        View.post(JSON.parse(response)[0]);
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        if (error.status == 401) {
          localStorage.clear();
          Controller.index();
        } else {
          let view = new View();
          view.errorPage(error);
        }
      });
  }

  static deleteArticle() {
    const user_id = localStorage.getItem("userId");
    let url =
      urlServer +
      "articles/" +
      article_id +
      "/" +
      user_id +
      "/" +
      Controller.isAdmin();
    Model.delete(url)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        console.log("article supprimé!");
        let view = new View();
        view.wall();
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        if (error.status == 401) {
          localStorage.clear();
          Controller.index();
        } else {
          let view = new View();
          view.errorPage(error);
        }
      });
  }
  /*********************************** Méthodes gérants les commentaires ***********************************/

  static sendComment() {
    const user_id = localStorage.getItem("userId");
    let url = urlServer + "comment";
    let formulaire = document.getElementById("formulaire");
    let data = new FormData(formulaire);
    let comment = {
      user_id: user_id,
      article_id: article_id,
      commentaire: Controller.getFormData(data).commentaire,
    };
    let postObject = JSON.stringify(comment);
    Model.postAuth(url, postObject)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        let view = new View();
        view.wall();
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        if (error.status == 401) {
          localStorage.clear();
          Controller.index();
        } else {
          let view = new View();
          view.errorPage(error);
        }
      });
  }

  static getComment() {
    let url = urlServer + "comment/article/" + article_id;
    let comments = Model.get(url)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        let view = new View();
        view.showComment(JSON.parse(response));
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        if (error.status == 401) {
          localStorage.clear();
          Controller.index();
        } else {
          let view = new View();
          view.errorPage(error);
        }
      });
  }

  static getCommentByUser() {
    const user_id = localStorage.getItem("userId");
    let url = urlServer + "comment/user/" + user_id;
    let comments = Model.get(url)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        let view = new View();
        view.showCommentByUser(JSON.parse(response));
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        if (error.status == 401) {
          localStorage.clear();
          Controller.index();
        } else {
          let view = new View();
          view.errorPage(error);
        }
      });
  }

  static getCommentByID(id) {
    let url = urlServer + "comment/" + id;
    let comments = Model.get(url)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        let view = new View();
        view.modifyComment(JSON.parse(response)[0]);
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        if (error.status == 401) {
          localStorage.clear();
          Controller.index();
        } else {
          let view = new View();
          view.errorPage(error);
        }
      });
  }

  static modifyComment() {
    const user_id = localStorage.getItem("userId");
    let formulaire = document.getElementById("formulaire");
    let data = new FormData(formulaire);
    let comment = Controller.getFormData(data);
    let url = urlServer + "comment/" + comment.id;
    Model.put(url, JSON.stringify(comment))
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        Controller.getCommentByUser(user_id);
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        if (error.status == 401) {
          localStorage.clear();
          Controller.index();
        } else {
          let view = new View();
          view.errorPage(error);
        }
      });
  }

  static deleteComment(id) {
    let url = urlServer + "comment/" + id + "/" + Controller.isAdmin();
    Model.delete(url)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        console.log("commentaire supprimé!");
        let view = new View();
        view.wall();
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        if (error.status == 401) {
          localStorage.clear();
          Controller.index();
        } else {
          let view = new View();
          view.errorPage(error);
        }
      });
  }

  /*********************************** Méthodes gérant les likes ***********************************/

  static like() {
    const user_id = localStorage.getItem("userId");
    let url = urlServer + "like/like";
    let newLike = {
      user_id: user_id,
      article_id: article_id,
      likes: 1,
      dislikes: 0,
    };
    let postObject = JSON.stringify(newLike);
    Model.postAuth(url, postObject)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        Controller.getLikeByArticle();
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        if (error.status == 401) {
          localStorage.clear();
          Controller.index();
        } else {
          let view = new View();
          view.errorPage(error);
        }
      });
  }
  static dislike() {
    const user_id = localStorage.getItem("userId");
    let url = urlServer + "like/dislike";
    let newDislike = {
      user_id: user_id,
      article_id: article_id,
      likes: 0,
      dislikes: 1,
    };
    let postObject = JSON.stringify(newDislike);
    Model.postAuth(url, postObject)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        Controller.getLikeByArticle();
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        if (error.status == 401) {
          localStorage.clear();
          Controller.index();
        } else {
          let view = new View();
          view.errorPage(error);
        }
      });
  }

  static undoLike() {
    const user_id = localStorage.getItem("userId");
    let url = urlServer + "like/undo/" + user_id + "/" + article_id;
    Model.delete(url)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        Controller.getLikeByArticle();
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        if (error.status == 401) {
          localStorage.clear();
          Controller.index();
        } else {
          let view = new View();
          view.errorPage(error);
        }
      });
  }

  static getLikeByArticle() {
    let url = urlServer + "like/article/" + article_id;
    let likes = Model.get(url)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        let view = new View();
        view.like(JSON.parse(response));
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
      });
  }

  static likesCount() {
    let url = urlServer + "like/like/" + article_id;
    let likes = Model.get(url)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        let view = new View();
        view.showLikeCount(JSON.parse(response));
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        if (error.status == 401) {
          localStorage.clear();
          Controller.index();
        } else {
          let view = new View();
          view.errorPage(error);
        }
      });
  }

  static dislikesCount() {
    let url = urlServer + "like/dislike/" + article_id;
    let likes = Model.get(url)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        let view = new View();
        view.showDislikeCount(JSON.parse(response));
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        if (error.status == 401) {
          localStorage.clear();
          Controller.index();
        } else {
          let view = new View();
          view.errorPage(error);
        }
      });
  }

  static getLikeByUser() {
    const user_id = localStorage.getItem("userId");
    let url = urlServer + "like/user/" + user_id;
    let likes = Model.get(url)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        let view = new View();
        view.showArticlesByLike(JSON.parse(response));
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        if (error.status == 401) {
          localStorage.clear();
          Controller.index();
        } else {
          let view = new View();
          view.errorPage(error);
        }
      });
  }
}
