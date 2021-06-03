let panier = JSON.parse(localStorage.getItem("panier"));
let id = new URLSearchParams(window.location.search).get("id");
let url = "http://localhost:8889/api/user/";
let urlId = url + id;

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
    let formulaire = document.getElementById("formulaire");
    let data = new FormData(formulaire);
    let user = JSON.stringify(Controller.getFormData(data));
    Model.post(url, user)
      .then(function (response) {
        console.log("Connexion à l'API réussie!");
        console.log("Utilisateur enregistré!");
      })
      .catch(function (error) {
        console.log("Échec connexion API. Erreur=", error);
      });
  }
}