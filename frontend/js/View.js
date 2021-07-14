const url = "http://localhost:3000/";

class View {
  /*********************************** Eléments utils dans plusieurs autres affichages ***********************************/
  static startHeader() {
    document.body.innerHTML = /*html*/ `
        <header>
            <p><img src="./logo/icon-left-font.png" alt="logo Groupomania"></p>
            <nav>
                <ul>
                    <li> <a href=# onclick="Controller.inscription(this); return false;" >Inscription </a></li>
                    <li> <a href=# onclick="Controller.connexion(this); return false;" >Connexion </a></li>
                </ul>  
            </nav>
        </header>
        `;
  }

  static header() {
    document.body.innerHTML = /*html*/ `
        <header>
            <p><img src="./logo/icon-left-font.png" alt="logo Groupomania"></p>
            <nav>
                <ul id="menu">
                    <li> <a href=# onclick="Controller.showProfil(this); return false;" >Mon Profil </a></li>
                    <li> <a href=# onclick="Controller.deconnexion(this); return false;" >Déconnexion </a></li>
                    <li> <a href=# onclick="View.post(this); return false;" >Créer un post </a></li>
                </ul>  
            </nav>
        </header>
        `;

    if (localStorage.getItem("isAdmin")) {
      document.getElementById("menu").innerHTML += /*html*/ `
          <li> <a href=# onclick="Controller.getAllUsers(this); return false;" >Afficher les utilisateurs </a></li>
          
          `;
    }
  }

  static modifyButton(object) {
    if (object.isArticle) {
      if (object.user_id == localStorage.getItem("userId")) {
        document.getElementById("userButton").innerHTML += /*html*/ `
            <button  class="modify" type="submit" onclick="Controller.modifyArticle(this); return false"> Modifier </button>
            `;
      }
    } else if (object.isComment) {
      if (object.user_id == localStorage.getItem("userId")) {
        let comment = object;
        let id = "userButton" + comment.id;
        document.getElementById(
          "userButton" + comment.id
        ).innerHTML += /*html*/ `
              <button  class="modify" type="submit" onclick="Controller.getCommentByID(${comment.id}); return false"> Modifier </button>
              `;
      }
    }
  }

  static deleteButton(object) {
    if (object.isArticle) {
      if (
        object.user_id == localStorage.getItem("userId") ||
        localStorage.getItem("isAdmin")
      ) {
        document.getElementById("userButton").innerHTML += /*html*/ `
              <button type="submit" onclick="Controller.deleteArticle(this)"> Supprimer </button>
              `;
      }
    } else if (object.isComment) {
      if (
        object.user_id == localStorage.getItem("userId") ||
        localStorage.getItem("isAdmin")
      ) {
        document.getElementById(
          "userButton" + object.id
        ).innerHTML += /*html*/ `
              <button type="submit" onclick="Controller.deleteComment(${object.id})"> Supprimer </button>
              `;
      }
    }
  }

  showLikeCount(count) {
    if (count[0].somme > 0) {
      document.getElementById("like").innerHTML += /*html*/ `
        <p>${count[0].somme}</p>
        `;
    } else {
      document.getElementById("like").innerHTML += /*html*/ `
        <p>0</p>
        `;
    }
  }

  showDislikeCount(count) {
    if (count[0].somme > 0) {
      document.getElementById("dislike").innerHTML += /*html*/ `
        <p>${count[0].somme}</p>
        `;
    } else {
      document.getElementById("dislike").innerHTML += /*html*/ `
        <p>0</p>
        `;
    }
  }

  errorPage(error) {
    document.body.innerHTML += /*html*/ `
    <div class="customBoxContainer">
                <div class="backgroundBlur"></div>
                <div class="custom-box error-box">
                  <h2>Oups!</h2>
                  <p><i class="fas fa-exclamation-triangle"></i></p>
                  <p>L'erreur suivante s'est produite: 
                  <br><br><span>${error}</span><br><br> 
                  Veuillez réessayer ou contacter votre administrateur réseau.
                  </p>
                  <button type="submit" onclick="Controller.index(this); return false"> Retour à l'accueil </button>
                </div>
    
    `;
    if (error.responseText) {
      document.querySelector("span").innerHTML = error.responseText;
    } else {
      document.querySelector("span").innerHTML = error;
    }
  }

  /*********************************** Pages de démarrage ***********************************/

  startPage() {
    View.startHeader();
    document.body.innerHTML += /*html*/ `
        <main id="start">
            <h1>Bienvenue sur le réseau Groupomania!</h1>
            <section>
                <img src="./logo/icon-above-font.png" alt="Logo large de Groupomania">
            </section>
        </main>
        `;
  }

  inscription() {
    document.getElementById("start").innerHTML += /*html*/ `      
      <div class="customBoxContainer">
        <div class="backgroundBlur"></div>
        <div class="custom-box">
          <input id="close" type="button" value="fermer" onclick="Controller.index(this); return false">
          <div id="scroll">
          <h1>Inscription</h1>
          <p>Afin de procéder à votre inscription, merci de remplir le formulaire ci-dessous</p>
          <form
          id="formulaire"
          name="contact"
          onsubmit="Controller.signup(this); return false;"
          >
            <label for="name">Nom:</label>
            <input
              type="text"
              id="name"
              name="name"
              pattern="[A-ZÀ-ÿa-z\\s-]{2,100}"
              placeholder="Nom"
              required
            /><br /><br />
            <label for="firstname">Prénom:</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              pattern="[A-ZÀ-ÿa-z\\s-]{2,100}"
              placeholder="Prénom"
              required
            /><br /><br />
            <label for="email">e-mail:</label>
            <input
              id="email"
              type="email"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}"
              placeholder="e-mail"
              required
            /><br /><br />
            <label for="password">Mot de passe: (Min. 8 caractères dont 1 majuscule, 1 minuscule, 1 chiffre)</label>
            <input
              id="password"
              type="password"
              name="password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"
              placeholder="Mot de passe"
              required
            />
            <button type="submit" name="submit">S'inscrire</button>
          </form>
        </div>
        </div>
      </div>
    `;
  }

  connexion() {
    document.getElementById("start").innerHTML += /*html*/ `
      <div class="customBoxContainer">
        <div class="backgroundBlur"></div>
        <div class="custom-box">
          <input id="close" type="button" value="fermer" onclick="Controller.index(this); return false">
          <h1>Connexion</h1>
          <p>Connectez-vous à l'aide de vos identifiants</p>
          <form
          id="formulaire",
          name="contact",
          onsubmit="Controller.login(this); return false;"
          >
            <label for="email">e-mail</label>
            <input
              id="email"
              type="email"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}"
              placeholder="e-mail"
              required
            /><br /><br />
            <label for="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              name="password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"
              placeholder="password"
              required
            />
            <button type="submit" name="submit">Se connecter</button>
          </form>
        </div>
      </div>            
    `;
  }

  wall() {
    View.header();
    document.body.innerHTML += /*html*/ `
        <main id="main">
            <h1>Bienvenue sur le réseau Groupomania!</h1>
            <section id="articles">
            </section>
        </main>
        `;
    Controller.getArticles();
  }

  /*********************************** Vues concernant l'utilisateur ***********************************/

  showProfil(user) {
    if (document.getElementById("modifyUser")) {
      document.body.removeChild(document.getElementById("modifyUser"));
    }
    document.getElementById("main").innerHTML += /*html*/ `
        <aside id="aside">
            <input id="close" type="button" value="fermer" onclick="Controller.index(this); return false">  
            <h2>${user.name} ${user.firstname} </h2>
            <p>${user.email}</p>
            <div>
                <button class="modify" type="submit" onclick="Controller.getUser(this); return false">Modifier</button>
                <button type="submit" onclick="Controller.deleteUser(this); return false">Supprimer</button>
            </div>
            <ul>
                <li><a href="#" onclick="Controller.getLikeByUser(this); return false">Mes j'aime</a></li>
                <li><a href="#" onclick="Controller.getCommentByUser(this); return false;">Mes commentaires</a></li>
                <li><a href="#" onclick="Controller.getArticlesByUser(this); return false;">Mes posts</a></li>
            </ul>
        </aside>
    `;
  }

  modifyUser(user) {
    document.body.innerHTML += /*html*/ `
        <div class="customBoxContainer" id="modifyUser">
          <div class="backgroundBlur"></div>
          <div class="custom-box">
            <input id="close" type="button" value="fermer" onclick="Controller.index(this); return false">
            <div id="scroll">
            <form
            id="formulaire"
            name="contact"
            onsubmit="Controller.modifyUser(this); return false;"
            >
            <input
              type="hidden"
              name="id"
              value="${user.id}"
            />
            <input
              type="hidden"
              name="isAdmin"
              id="isAdmin"
              pattern="[A-ZÀ-ÿa-z\\s-]{2,100}"
              value="${user.isAdmin}"
            />
            <label for="name">Nom:</label>
            <input
              type="text"
              id="name"
              name="name"
              pattern="[A-ZÀ-ÿa-z\\s-]{2,100}"
              placeholder="Nom"
              value="${user.name}"
            /><br /><br />

            <label for="firstname">Prénom:</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              pattern="[A-ZÀ-ÿa-z\\s-]{2,100}"
              placeholder="Prénom"
              value="${user.firstname}"
            /><br /><br />

            <label for="email">e-mail:</label>
            <input
              id="email"
              type="email"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}"
              placeholder="e-mail"
              value="${user.email}"
            /><br /><br />

            <label for="password">Mot de passe:</label>
            <input
              id="password"
              type="password"
              name="password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"
              placeholder="password"
            />
            <button id="button" type="submit" name="submit">Modifier le profil</button>
          </form>
        </div>
        </div>
      </div>
    `;

    if (localStorage.getItem("isAdmin")) {
      document
        .getElementById("formulaire")
        .removeChild(document.getElementById("isAdmin"));
      document.getElementById("formulaire").innerHTML += /*html*/ `
        <label id="adminLabel" for="isAdmin">Administrateur</label>
            <select
              name="isAdmin"
              id="isAdmin"
            >
              <option value="0">0</option>
              <option id="admin" value="1">1</option>
            </select>
      `;
      if (user.isAdmin == 1) {
        document.getElementById("admin").setAttribute("selected", "");
      }
      document
        .getElementById("formulaire")
        .insertBefore(
          document.getElementById("isAdmin"),
          document.getElementById("button")
        );
      document
        .getElementById("formulaire")
        .insertBefore(
          document.getElementById("adminLabel"),
          document.getElementById("isAdmin")
        );
    }
  }

  showUsers(users) {
    View.header();
    document.body.innerHTML += /*html*/ `
        <main id="main">
            <h1>Bienvenue sur le réseau Groupomania!</h1>
            <section id="users">
              <h2>Les utilisateurs</h2>
            </section>
            <button type="submit" onclick="Controller.index(this); return false;"> Retour à l'accueil</button>
        </main>
      `;

    for (let user of users) {
      document.getElementById("users").innerHTML += /*html*/ `
          <article>
            <div>
              <p>${user.name} ${user.firstname}</p>
              <p>${user.email}</p>
              <div class="button">
                <button class="modify" type="submit" onclick="Controller.getUserByAdmin(${user.id}); return false">Modifier l'utilisateur</button>
                <button type="submit" onclick="Controller.deleteUserByAdmin(${user.id}); return false">Supprimer l'utilisateur</button>
              </div>
            </div>
          </article>
        `;
    }
  }
  /*********************************** Vue concernant les articles ***********************************/
  static post(article) {
    document.body.innerHTML += /*html*/ `
            <div class="customBoxContainer">
                <div class="backgroundBlur"></div>
                <div class="custom-box">
                  <div id="scroll">
                    <form id="formulaire" onsubmit="Controller.savePost(this,${
                      article.id
                    }); return false">
                        <input id="close" type="button" value="fermer" onclick="Controller.index(this); return false">
                        <input type="hidden" name="user_id" value="${localStorage.getItem(
                          "userId"
                        )}">
                        <input type="hidden" name="id" value="${article.id}">
                    <label for="title">Titre</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value="${article.title}"
                        pattern="[A-ZÀ-ÿa-z0-9\\s-']{2,100}"
                        placeholder="Titre"
                        required
                    />
                    <label for="body">texte</label>
                    <textarea id="body"
                        name="body"
                        required
                    >  
                    </textarea>
                    <div id=imgPreview></div>
                    <label for="image">image</label>
                    <input
                        id="image"
                        type="file"
                        name="image"
                        accept=".png, .jpg, .jpeg"
                        placeholder="insérer une image"
                    />
                    <div>
                        <button type="submit">Poster l'article</button>
                    </div>
                  </div>
                </div>
            </div>
        `;

    if (article.body) {
      document.getElementById("body").innerHTML = article.body;
    }
    let image = document.getElementById("image").files;
    if (image.length == 0) {
      if (article.imageUrl) {
        document.getElementById("imgPreview").innerHTML = /*html*/ `
                <img src="${url}${article.imageUrl}" alt="Image séléctionnée pour votre article">
                `;
      } else {
        document.getElementById("imgPreview").innerHTML = /*html*/ `
                  <p>Pas d'image séléctionnée</p>
                `;
      }
    }

    const imagepreview = () => {
      let image = document.getElementById("image").files;
      let imageSrc = window.URL.createObjectURL(image[0]);
      document.getElementById("imgPreview").innerHTML = /*html*/ `
          <img src="${imageSrc}" alt="Image séléctionnée pour votre article">
          `;
    };
    document.getElementById("image").addEventListener("change", imagepreview);
  }

  showArticles(articles) {
    document.getElementById("articles");
    while (document.getElementById("articles").firstChild) {
      document
        .getElementById("articles")
        .removeChild(document.getElementById("articles").firstChild);
    }
    for (let article of articles) {
      document.getElementById("articles").innerHTML += /*html*/ `
            <a href="index.html?id=${article.id}">
                <article>
                    <h2>${article.title}</h2>
                    <p class="author">Par ${article.firstname} ${
        article.name
      } ${Controller.getTimeLaps(article.created_at)} </p>
                    <p><img src="${url}${
        article.imageUrl
      }" alt="Image illustrant l'article ${article.title}"></p>
                    <p class="extrait">${article.body}</p>
                </article>
            </a>
            `;
    }
  }

  showArticlesByLike(articles) {
    if (document.getElementById("articles")) {
      while (document.getElementById("articles").firstChild) {
        document
          .getElementById("articles")
          .removeChild(document.getElementById("articles").firstChild);
      }
    }
    if (document.getElementById("comment")) {
      while (document.getElementById("comment").firstChild) {
        document
          .getElementById("comment")
          .removeChild(document.getElementById("comment").firstChild);
      }
    }
    if (document.getElementById("backHome")) {
      document.body.removeChild(document.getElementById("backHome"));
    }
    document.getElementById("main").innerHTML += /*html*/ `
        <section id="articles">
        </section>
      `;
    document
      .getElementById("main")
      .removeChild(document.getElementById("aside"));
    for (let article of articles) {
      document.getElementById("articles").innerHTML += /*html*/ `
            <a href="index.html?id=${article.id}">
                <article>
                    <h2>${article.title}</h2>
                    <p class="author">Par ${article.firstname} ${
        article.name
      } ${Controller.getTimeLaps(article.created_at)} </p>
                    <p><img src="${url}${
        article.imageUrl
      }" alt="Image illustrant l'article ${article.title}"></p>
                    <p class="extrait">${article.body}</p>
                </article>
            </a>
            `;
    }
    document.body.innerHTML += /*html*/ `
        <button id="backHome" type="submit" onclick="Controller.index(this); return false;"> Retour à l'accueil</button>
    `;
  }

  showOneArticle(article) {
    let text = article.body.split("\r\n").join("</br>");
    document.body.innerHTML += /*html*/ `
            <div class="customBoxContainer">
                <div class="backgroundBlur"></div>
                <div class="custom-box" id="oneArticle">
                    <input id="close" type="button" value="fermer" onclick="window.location.replace('index.html')">
                    <div id="scroll">
                      <div>
                      <p>${article.name} ${article.firstname}</p>
                      <p>${Controller.getTimeLaps(article.created_at)}</p>
                      </div>
                      <article class="article">
                          <h2>${article.title}</h2>
                          <a href="${url}${article.imageUrl}" target="_blank">
                              <img src="${url}${
      article.imageUrl
    }" alt="Image illustrant l'article ${article.title}"/>
                          </a>
                          <p>${text}</p>
                      </article>
                      <div id="userButton" class="userButton"></div>
                      <div class="like">
                          <div id= "like">
                          </div>
                          <div id= "dislike">
                          </div>
                      </div>
                      <form id="formulaire" class="comment" onsubmit="Controller.sendComment(this); return false;">
                          <label for="commentaire">Laissez un commentaire</label>
                          <input type="text" name="commentaire" id="commentaire"/>
                          <button type="submit" aria-label="Bouton permettant d'envoyer le commentaire."><i class="far fa-paper-plane"></i></button>
                      </form>
                    </div>
                </div>
            </div>
        `;
    let object = { ...article, isArticle: 1 };
    Controller.getComment();
    View.modifyButton(object);
    View.deleteButton(object);
    Controller.getLikeByArticle();
  }

  showArticlesByUser(articles) {
    if (document.getElementById("articles")) {
      while (document.getElementById("articles").firstChild) {
        document
          .getElementById("articles")
          .removeChild(document.getElementById("articles").firstChild);
      }
    }
    if (document.getElementById("comment")) {
      while (document.getElementById("comment").firstChild) {
        document
          .getElementById("comment")
          .removeChild(document.getElementById("comment").firstChild);
      }
    }
    if (document.getElementById("backHome")) {
      document.body.removeChild(document.getElementById("backHome"));
    }
    document
      .getElementById("main")
      .removeChild(document.getElementById("aside"));
    document.getElementById("main").innerHTML += /*html*/ `
        <section id="articles">
        </section>
      `;
    for (let article of articles) {
      let text = article.body.replace("\r\n", "<br>");
      document.getElementById("articles").innerHTML += /*html*/ `
            <a href="index.html?id=${article.id}">
                <article>
                  <h2>${article.title}</h2>
                  <p><img src="${url}${article.imageUrl}" alt="Image illustrant l'article ${article.title}"></p>
                  <p class="extrait">${text}</p>
                </article>
            </a>
            `;
    }
    document.body.innerHTML += /*html*/ `
        <button id="backHome" type="submit" onclick="Controller.index(this); return false;"> Retour à l'accueil</button>
    `;
  }
  /*********************************** Vues concernant les Likes/Dislike ***********************************/
  like(likes) {
    let like = likes.filter((likes) => likes.likes == 1);
    let dislike = likes.filter((likes) => likes.dislikes == 1);
    let testLike = like.filter(
      (likes) => likes.user_id == localStorage.getItem("userId")
    );
    let testDislike = dislike.filter(
      (likes) => likes.user_id == localStorage.getItem("userId")
    );
    if (testLike.length > 0) {
      document.getElementById("like").innerHTML = `
        <a href="#" onclick="Controller.undoLike(this); return false" aria-label="Bouton pour anuler un j'aime."><i class="fas fa-thumbs-up"></i></a>
        `;
      document.getElementById("dislike").innerHTML = `
        <a href="#"  class="disable" aria-label="Bouton pour ajouter un j'aime pas, désactivé car l'article est déjà aimé."><i class="far fa-thumbs-down"></i></a>
        `;
    } else if (testDislike.length > 0) {
      document.getElementById("like").innerHTML = `
            <a href="#" class="disable" aria-label="Bouton pour ajouter un j'aime, désactivé car le j'aime pas est déjà séléctionné."><i class="far fa-thumbs-up"></i></a>
            `;
      document.getElementById("dislike").innerHTML = `
        <a href="#"  onclick="Controller.undoLike(this); return false" aria-label="Bouton pour annuler un j'aime pas"><i class="fas fa-thumbs-down"></i></a>
        `;
    } else {
      document.getElementById("like").innerHTML = `
            <a href="#"  onclick="Controller.like(this); return false" aria-label="Bouton pour ajouter un j'aime"><i class="far fa-thumbs-up"></i></a>
            `;
      document.getElementById("dislike").innerHTML = `
            <a href="#"  onclick="Controller.dislike(this); return false" aria-label="Bouton pour ajouter un j'aime pas"><i class="far fa-thumbs-down"></i></a>
            `;
    }
    Controller.likesCount();
    Controller.dislikesCount();
  }

  /*********************************** Vues concernant les commentaires ***********************************/

  showComment(comments) {
    for (let comment of comments) {
      document.getElementById("scroll").innerHTML += /*html*/ `
            <div class="comments" id="comments${comment.id}">
              <p class="author">Par ${comment.firstname} ${comment.name}</p>
              <p>${comment.commentaire}</p>
            </div>

        `;
      if (comment.user_id == localStorage.getItem("userId")) {
        document
          .getElementById("scroll")
          .removeChild(document.getElementById("formulaire"));
      }
      if (
        localStorage.getItem("isAdmin") &&
        document.getElementById("comments" + comment.id)
      ) {
        document.getElementById("comments" + comment.id).innerHTML += /*html*/ `
          <button type="submit" onclick="Controller.deleteComment(${comment.id})" aria-label="Bouton permettant de supprimer le commentaire."><i class="fas fa-trash-alt"></i></button>
        `;
      }
    }
  }

  showCommentByUser(comments) {
    View.header();
    document.body.innerHTML += /*html*/ `
        <main id="main">
            <h1>Bienvenue sur le réseau Groupomania!</h1>
            <section id="comment">
              <h2>Mes commentaires</h2>
            </section>
        </main>
        <button id="backHome" type="submit" onclick="Controller.index(this); return false;"> Retour à l'accueil</button>
      `;

    for (let comment of comments) {
      document.getElementById("comment").innerHTML += /*html*/ `
          <article class="comment-user">
          <h3> Commentaire sur l'article:</h3>
            <a href="index.html?id=${comment.article_id}">
              <p> ${comment.title}</p>
              <p><img src="${url}${comment.imageUrl}" alt="Image illustrant l'article ${comment.title}"></p> 
            </a>
            <div>
              <p>${comment.commentaire}</p>
              <div id="userButton${comment.id}" class="userButton"></div>
            </div>
          </article>
        `;
      let object = { ...comment, isComment: 1 };
      View.modifyButton(object);
      View.deleteButton(object);
    }
  }

  modifyComment(comment) {
    document.body.innerHTML += /*html*/ `
            <div class="customBoxContainer">
                <div class="backgroundBlur"></div>
                <div class="custom-box modifyComment" >
                    <input id="close" type="button" value="fermer" onclick="window.location.replace('index.html')">
                    <form methode="post" id="formulaire" class="comment" onsubmit="Controller.modifyComment(this); return false;">
                        <input type="hidden" name="id" value="${comment.id}"/>
                        <label for="commentaire">Modifiez votre commentaire</label>
                        <input type="text" name="commentaire" id="commentaire" value="${comment.commentaire}"/>
                        <button type="submit" aria-label="Bouton permettant d'envoyer le commentaire modifié."><i class="far fa-paper-plane"></i></button>
                    </form>
                </div>
            </div>
        `;
  }
}
