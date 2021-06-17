let id = new URLSearchParams(window.location.search).get("id");


class Controller {
  //Fonctions générales
  static getFormData(formData) {
    let objectData = {};
    formData.forEach(function (value, key) {
      objectData[key] = value;
    });
    return objectData;
  }

  static deconnexion() {
    localStorage.clear();
    Controller.index();
  }

  static signup() {
    let url = "http://localhost:3000/api/user/signup";
    let formulaire = document.getElementById("formulaire");
    let data = new FormData(formulaire);
    let user = JSON.stringify(Controller.getFormData(data));
    console.log("Utilisateur:", user);
    Model.post(url, user)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        console.log("Utilisateur enregistré!");
      })
      .catch(function (error) {
        console.log("Échec connexion API. Erreur=", error);
      });
  }

  static login(){
    let url = "http://localhost:3000/api/user/login";
    let formulaire = document.getElementById("formulaire");
    let data = new FormData(formulaire);
    let user = JSON.stringify(Controller.getFormData(data));
    Model.post(url, user)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        console.log("Utilisateur connecté!");
        user=JSON.parse(response);
        localStorage.setItem("userToken", user.token);
        localStorage.setItem("userId", user.userId);
        let view= new View ();
        view.wall();
      })
      .catch(function (error) {
        console.log("Échec connexion API. Erreur=", error);
      });
  }
  
  static index(){
    if (localStorage.getItem("userId")>0){
      let view = new View();
        view.wall();
        if (document.location.href.indexOf('id') > -1){ 
          Controller.getOneArticle();
      }

    } else {
      let view = new View();
      view.startPage();
    }
    
  }

  static inscription(){
    let view = new View();
        view.inscription();
  }

  static connexion(){
    let view = new View();
        view.connexion();
  }

  static showProfil(){
    let url="http://localhost:3000/api/user/4"
    let user = Model.get(url)
      .then(function (response) {
        console.log("réponse",JSON.parse(response)[0]);
        console.log("Connexion à l'API réussie!");
        let view = new View();
        view.showProfil(JSON.parse(response)[0]);
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        /* let view = new View();
        view.showProfil([]); */
      });

  }

  static publishPost(){
    let url = "http://localhost:3000/api/articles";
    let today= new Date();
    let todayYear= today.getFullYear();
    let todayMonth= today.getMonth();
    let todayDay= today.getDay();
    let todayDate = todayYear+'/'+todayMonth+'/'+todayDay;
    let todayTime = today.toLocaleTimeString('fr-FR',{
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
    let file = document.getElementById("image").value;
    console.log("image",file);  
    let formulaire = document.getElementById("formulaire");
    let data = new FormData(formulaire);
    let article = {title: Controller.getFormData(data).articleTitle,
    body: Controller.getFormData(data).text,
    author: localStorage.getItem("userId"),
    date: todayDate + ' ' + todayTime,
    };
    let postObject= JSON.stringify(article);
    console.log("article", postObject);
    Model.postAuth(url, postObject)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        console.log(JSON.parse(response));
        let view= new View ();
        view.wall();
      })
      .catch(function (error) {
        console.log("Échec connexion API. Erreur=", error);
      });
    
  }

  static getArticles(){
    let url="http://localhost:3000/api/articles"
    let articles = Model.get(url)
      .then(function (response) {
        console.log("réponse",JSON.parse(response));
        console.log("Connexion à l'API réussie!");
        let view = new View();
        view.showArticles(JSON.parse(response));
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        /* let view = new View();
        view.showArticles([]); */
      });

  }

  static getOneArticle(){
    let id= new URLSearchParams(window.location.search).get("id");
    let url="http://localhost:3000/api/articles/"+ id;
    let article = Model.get(url)
      .then(function (response) {
        console.log("réponse",JSON.parse(response));
        console.log("Connexion à l'API réussie!");
        let view = new View();
        view.showOneArticle(JSON.parse(response));
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        /* let view = new View();
        view.showOneArticle([]); */
      });

  }

  static sendComment(){
    let url = "http://localhost:3000/api/comment";
    let id= new URLSearchParams(window.location.search).get("id")
    let formulaire = document.getElementById("formulaire");
    let data = new FormData(formulaire);
    console.log(Controller.getFormData(data));
    let comment = {
    author: localStorage.getItem("userId"),
    article: id,
    commentaire: Controller.getFormData(data).commentaire
    };
    let postObject= JSON.stringify(comment);
    console.log("commentaire", postObject);
    Model.postAuth(url, postObject)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        console.log(JSON.parse(response));
        let view= new View ();
        view.wall();
      })
      .catch(function (error) {
        console.log("Échec connexion API. Erreur=", error);
      });
    

  }

  static getComment(){
    let url="http://localhost:3000/api/comment"
    let comments = Model.get(url)
      .then(function (response) {
        console.log("réponse",JSON.parse(response));
        console.log("Connexion à l'API réussie!");
        let view = new View();
        view.showComment(JSON.parse(response));
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        /* let view = new View();
        view.showArticles([]); */
      });

  }

}