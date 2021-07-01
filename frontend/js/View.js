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
                <ul>
                    <li> <a href=# onclick="Controller.showProfil(this); return false;" >Mon Profil </a></li>
                    <li> <a href=# onclick="Controller.deconnexion(this); return false;" >Déconnexion </a></li>
                    <li> <a href=# onclick="View.post(this); return false;" >Créer un post </a></li>
                </ul>  
            </nav>
        </header>
        `;
  }

  static modifyButton(user_id) {
    if (user_id == localStorage.getItem("userId")) {
      document.getElementById("userButton").innerHTML += /*html*/ `
            <button  class="modify" type="submit" onclick="Controller.modifyArticle(this); return false"> Modifier </button>
            `;
    }
  }

  static deleteButton(user_id) {
    if (user_id == localStorage.getItem("userId")) {
      document.getElementById("userButton").innerHTML += /*html*/ `
            <button type="submit" onclick="Controller.deleteArticle(this)"> Supprimer </button>
            `;
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
  }

  /*********************************** Pages de démarrage ***********************************/

  startPage() {
    View.startHeader();
    document.body.innerHTML += /*html*/ `
        <main id="start">
            <h1>Bienvenue sur le réseau Groupomania!</h1>
            <section>
                <img src="./logo/icon-above-font.png">
            </section>
        </main>
        `;
  }

  inscription() {
    document.getElementById("start").innerHTML += /*html*/ `      
      <div class="customBoxContainer">
        <div class="backgroundBlur"></div>
        <div class="custom-box">
          <input id="close" type="button" value="fermer" onclick="Controller.index(); return false">
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
              name="name"
              pattern="[A-ZÀ-ÿa-z\s-]{2,100}"
              placeholder="Nom"
              required
            /><br /><br />
            <label for="firstname">Prénom:</label>
            <input
              type="text"
              name="firstname"
              pattern="[A-ZÀ-ÿa-z\s-]{2,100}"
              placeholder="Prénom"
              required
            /><br /><br />
            <label for="email">e-mail:</label>
            <input
              id="email"
              type="email"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
              placeholder="e-mail"
              required
            /><br /><br />
            <label for="password">Mot de passe:</label>
            <input
              id="password"
              type="password"
              name="password"
              pattern="[A-ZÀ-ÿa-z\s-]{2,100}"
              placeholder="password"
              required
            />
            <button type="submit" name="submit">S'inscrire</button>
          </form>
        </div>
      </div>
    `;
  }

  connexion() {
    document.getElementById("start").innerHTML += /*html*/ `
      <div class="customBoxContainer">
        <div class="backgroundBlur"></div>
        <div class="custom-box">
          <input id="close" type="button" value="fermer" onclick="Controller.index(); return false">
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
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
              placeholder="e-mail"
              required
            /><br /><br />
            <label for="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              name="password"
              pattern="[A-ZÀ-ÿa-z0-9\s-]{2,100}"
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
                    <aside>
                        <input id="close" type="button" value="fermer" onclick="Controller.index(); return false">  
                        <h2>${user.name} ${user.firstname} </h2>
                        <p>${user.email}</p>
                        <div>
                            <button class="modify" type="submit" onclick="Controller.getUser(this); return false">Modifier</button>
                            <button type="submit" onclick="Controller.deleteUser(this); return false">Supprimer</button>
                        </div>
                        <ul>
                            <li class="link" onclick="Controller.getLikeByUser(this); return false">Mes j'aime</li>
                            <li class="link" onclick="Controller.getCommentByUser(this); return false;">Mes commentaires</li>
                            <li class="link" onclick="Controller.getArticlesByUser(this); return false;">Mes posts</li>
                        </ul>
                    </aside>
                `;
  }

  modifyUser(user) {
    document.body.innerHTML += /*html*/ `
        <div class="customBoxContainer" id="modifyUser">
                <div class="backgroundBlur"></div>
                <div class="custom-box" id="oneArticle">
        <form
        id="formulaire"
        name="contact"
        onsubmit="Controller.modifyUser(this); return false;"
      >
        <label for="name">Nom:</label>
        <input
          type="text"
          name="name"
          pattern="[A-ZÀ-ÿa-z\s-]{2,100}"
          placeholder="Nom"
          value="${user.name}"
        /><br /><br />

        <label for="firstname">Prénom:</label>
        <input
          type="text"
          name="firstname"
          pattern="[A-ZÀ-ÿa-z\s-]{2,100}"
          placeholder="Prénom"
          value="${user.firstname}"
        /><br /><br />

        <label for="email">e-mail:</label>
        <input
          id="email"
          type="email"
          name="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
          placeholder="e-mail"
          value="${user.email}"
        /><br /><br />

        <label for="password">Mot de passe:</label>
        <input
          id="password"
          type="password"
          name="password"
          pattern="[A-ZÀ-ÿa-z\s-]{2,100}"
          placeholder="password"
        />

        <button type="submit" name="submit">Modifier le profil</button>
      </form>
      </div>
      </div>
      `;
  }
  /*********************************** Vue concernant les articles ***********************************/
  static post(article) {
    document.body.innerHTML += /*html*/ `
            <div class="customBoxContainer">
                <div class="backgroundBlur"></div>
                <div class="custom-box">
                    <form id="formulaire" onsubmit="Controller.savePost(this); return false">
                        <input id="close" type="button" value="fermer" onclick="Controller.index(); return false">
                        <input type="hidden" name="user_id" value="${localStorage.getItem(
                          "userId"
                        )}">
                        <input type="hidden" name="id" value="${article.id}">
                    <label for="title">Titre</label>
                    <input
                        type="text"
                        name="title"
                        value="${article.title}"
                        pattern="[A-ZÀ-ÿa-z0-9\s-]{2,100}"
                        placeholder="Titre"
                        required
                    />
                    <label for="body">texte</label>
                    <input
                        id="body"
                        type="textarea"
                        name="body"
                        value="${article.body}"
                        pattern="[A-ZÀ-ÿa-z0-9\s-]{2,100}"
                        placeholder="Votre texte."
                        required
                    />
                    <label for="image">image</label>
                    <input
                        id="image"
                        type="file"
                        name="image"
                        value="${article.imageUrl}"
                        accept="image/.png, image/.jpg, image/.jpeg"
                        placeholder="insérer une image"
                    />
                    <div>
                        <button type="submit">Poster l'article</button>
                    </div>
                </div>
            </div>
        `;
  }

  showArticles(articles) {
    for (let article of articles) {
      document.getElementById("articles").innerHTML += /*html*/ `
            <a href="index.html?id=${article.id}">
                <article>
                    <h2>${article.title}</h2>
                    <p><img src="${article.imageUrl}"></p>
                    <p class="extrait">${article.body}</p>
                </article>
            </a>
            `;
    }
  }

  showOneArticle(user, article) {
    document.body.innerHTML += /*html*/ `
            <div class="customBoxContainer">
                <div class="backgroundBlur"></div>
                <div class="custom-box" id="oneArticle">
                    <input id="close" type="button" value="fermer" onclick="window.location.replace('index.html')">
                    <div>
                    <p>${user[0].name} ${user[0].firstname}</p>
                    <p>${Controller.getTimeLaps(article[0].created_at)}</p>
                    </div>
                    <article class="article">
                        <h2>${article[0].title}</h2>
                        <a href="${article[0].imageUrl}" target="_blank">
                            <img src="${article[0].imageUrl}"/>
                        </a>
                        <p>${article[0].body}</p>
                    </article>
                    <div id="userButton"></div>
                    <div class="like">
                        <div id= "like">
                        </div>
                        <div id= "dislike">
                        </div>
                    </div>
                    <form id="formulaire" class="comment" onsubmit="Controller.sendComment(this); return false;">
                        <label for="commentaire">Laissez un commentaire</label>
                        <input type="text" name="commentaire"/>
                        <button type="submit"><i class="far fa-paper-plane"></i></button>
                    </form>
                </div>
            </div>
        `;
    Controller.getComment();
    View.modifyButton(article[0].user_id);
    View.deleteButton(article[0].user_id);
    Controller.getLikeByArticle();
  }

  showArticlesByUser(articles) {
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
                    <p>${article.body}</p>
                </article>
            </a>
            `;
    }
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
        <a href="#" onclick="Controller.undoLike(this); return false"><i class="fas fa-thumbs-up"></i></a>
        `;
      document.getElementById("dislike").innerHTML = `
        <a href="#"  class="disable"><i class="far fa-thumbs-down"></i></a>
        `;
    } else if (testDislike.length > 0) {
      document.getElementById("like").innerHTML = `
            <a href="#" class="disable"><i class="far fa-thumbs-up"></i></a>
            `;
      document.getElementById("dislike").innerHTML = `
        <a href="#"  onclick="Controller.undoLike(this); return false"><i class="fas fa-thumbs-down"></i></a>
        `;
    } else {
      document.getElementById("like").innerHTML = `
            <a href="#"  onclick="Controller.like(this); return false"><i class="far fa-thumbs-up"></i></a>
            `;
      document.getElementById("dislike").innerHTML = `
            <a href="#"  onclick="Controller.dislike(this); return false"><i class="far fa-thumbs-down"></i></a>
            `;
    }
    Controller.likesCount();
    Controller.dislikesCount();
  }

  /*********************************** Vues concernant les commentaires ***********************************/

  showComment(comments) {
    for (let comment of comments) {
      document.getElementById("oneArticle").innerHTML += /*html*/ `
            <p>${comment.commentaire}</p>

        `;
    }
  }

  showCommentByUser(comments) {
    View.header();
    for (let comment of comments) {
      document.body.innerHTML += /*html*/`
        <div class="customBoxContainer">
          <div class="backgroundBlur"></div>
          <div class="custom-box">
            <input id="close" type="button" value="fermer" onclick="window.location.replace('index.html')">
            <h2>Mes commentaires</h2>
            <a href="index.html?id=${comment.article_id}"> 
              <article class="comment-user">
                <p> Commentaire sur l'article ${comment.article_id}</p>
                <p>${comment.commentaire}</p>
              </article> 
            </a>
          </div>
        </div>
      `;
    }
  }
}
