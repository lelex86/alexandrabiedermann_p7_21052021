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
      request.setRequestHeader(
        "Authorization",
        "Bearer " + localStorage.getItem("userToken")
      );
      request.send();
    });
  }

  // nouvelle méthode pour réaliser les requêtes POST sans authentification
  static post(url, user) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          if (request.status === 201 || request.status === 200) {
            resolve(request.responseText);
          } else {
            reject(request);
          }
        }
      };
      request.open("POST", url);
      request.setRequestHeader("Content-Type", "application/json");
      request.send(user);
    });
  }

  // nouvelle méthode pour réaliser les requêtes POST avec authentification
  static postAuth(url, object) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          if (request.status === 201 || request.status === 200) {
            resolve(request.responseText);
          } else {
            reject(request);
          }
        }
      };
      request.open("POST", url);
      request.setRequestHeader("Content-Type", "application/json");
      request.setRequestHeader(
        "Authorization",
        "Bearer " + localStorage.getItem("userToken")
      );
      request.send(object);
    });
  }

  // nouvelle méthode pour réaliser les requêtes POST et les requêtes PUT envoyant des images
  static postFetch(formData, method, url) {
    console.log("method=", method);
    console.log("url=", url);
    return new Promise(function (resolve, reject) {
      fetch(url, {
        method: method,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
        body: formData,
      })
        .then((response) => {
          if (response.status == 200 || response.status == 201) {
            response.json().then((data) => {
              resolve(data);
            });
          } else {
            reject(response.status);
          }
        })
        .catch((error) => {
          console.error("error=", error);
        });
    });
  }

  // nouvelle méthode pour réaliser les requêtes PUT
  static put(url, object) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          if (request.status === 201 || request.status === 200) {
            resolve(request.responseText);
          } else {
            reject(request);
          }
        }
      };
      request.open("PUT", url);
      request.setRequestHeader("Content-Type", "application/json");
      request.setRequestHeader(
        "Authorization",
        "Bearer " + localStorage.getItem("userToken")
      );
      request.send(object);
    });
  }

  // nouvelle méthode pour réaliser les requêtes DELETE sans authentification
  static delete(url) {
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
      request.open("DELETE", url);
      request.setRequestHeader(
        "Authorization",
        "Bearer " + localStorage.getItem("userToken")
      );
      request.send();
    });
  }
}
