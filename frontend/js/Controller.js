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

  login(){
    let url = "http://localhost:3000/api/user/login";
    let formulaire = document.getElementById("formulaire");
    let data = new FormData(formulaire);
    let user = JSON.stringify(Controller.getFormData(data));
    console.log("Utilisateur:", user);
    Model.post(url, user)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        console.log("Utilisateur connecté!");
        let view= new View ();
        view.homePage();
      })
      .catch(function (error) {
        console.log("Échec connexion API. Erreur=", error);
      });
  }
  
  index(){
    let view = new View();
        view.startPage();
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
    let url="http://localhost:3000/api/user/2"
    let user = Model.get(url)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        let view = new View();
        view.showProfil(JSON.parse(response));
      })
      .catch(function (error) {
        console.error("Échec connexion API. Erreur=", error);
        /* let view = new View();
        view.showProfil([]); */
      });

  }

}