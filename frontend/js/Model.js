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
      request.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("userToken"));
      request.send();
    });
  }

  // Nouvelle classe pour réaliser notre POST
  static post(url, user) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          if (request.status === 201 ||request.status === 200 ) {
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

  static postAuth(url, object) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          if (request.status === 201 ||request.status === 200 ) {
            resolve(request.responseText);
          } else {
            reject(request);
          }
        }
      };
      request.open("POST", url);
      request.setRequestHeader("Content-Type", "application/json");
      request.setRequestHeader("Authorization", "Bearer "+ localStorage.getItem("userToken"));
      request.send(object);
    });
  }

  static postFetch(formData, method, url) {
    console.log("method=",method);
    console.log("url=",url);
    return new Promise(function (resolve, reject) {
        fetch(url, {
                method: method,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("userToken")
                },
                body: formData
            })
            .then(response => {
              console.log("réponse:", response)
                if (response.status == 200 || response.status == 201) {
                    response.json()
                        .then(data => {
                            console.log("Data=", data);
                            resolve(data);
                        })
                } else {
                    reject(response.status);
                }
            })
            .catch(error => {
                console.log("error=", error);
            })
    })
}

}
