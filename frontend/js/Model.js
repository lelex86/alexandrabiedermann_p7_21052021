/**
 * Le but de cette classe est d'encapsuler les méhtodes pour pouvoir faire
 * les appels Ajax.
 */
class Model {
  /**
   * Cette méthode appelle une url et retourne son contenu.
   * @param {string} url
   */
  static get(url) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          if (request.status === 200) {
            resolve(request.responseText);
          } else {
            reject(request);
          }
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }

  // Nouvelle classe pour réaliser notre POST
  static post(url, order) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          if (request.status === 201) {
            resolve(request.responseText);
          } else {
            reject(request);
          }
        }
      };
      request.open("POST", url);
      request.setRequestHeader("Content-Type", "application/json");
      request.send(order);
    });
  }
}
