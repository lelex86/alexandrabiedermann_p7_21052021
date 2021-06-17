class View {

    static startHeader(){
        document.body.innerHTML=/*html*/`
        <header>
            <p><img src="./logo/icon-left-font.png" alt="logo Groupomania"></p>
            <nav>
                <ul>
                    <li> <a href=# onclick="Controller.inscription(this); return false;" >Inscription </a></li>
                    <li> <a href=# onclick="Controller.connexion(this); return false;" >Connexion </a></li>
                </ul>  
            </nav>
        </header>
        `
    }

    static header(){
        document.body.innerHTML=/*html*/`
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
        `
    }
  
    startPage(){
        View.startHeader();
        document.body.innerHTML+=/*html*/`
        <main>
            <h1>Bienvenue sur le réseau Groupomania!</h1>
            <section>
                <img src="./logo/icon-above-font.png">
            </section>
        </main>
        `
    }

    inscription(){
        View.startHeader();
        document.body.innerHTML+=/*html*/`
            
        <main>
            <h1>Inscription</h1>
            <p>Afin de procéder à votre inscription, merci de remplir le formulaire ci-dessous</p>
            <div></div>
            <form
          id="formulaire"
          name="contact"
          onsubmit="Controller.signup(this); return false;"
        >
          <label for="userName">Nom:</label>
          <input
            type="text"
            name="userName"
            pattern="[A-ZÀ-ÿa-z\s-]{2,100}"
            placeholder="Nom"
            required
          /><br /><br />

          <label for="userFirstname">Prénom:</label>
          <input
            type="text"
            name="userFirstname"
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

        </main>
        `
    }

    connexion(){
        View.startHeader();
        document.body.innerHTML+=/*html*/`
        <main>
            <h1>Connexion</h1>
            <p>Connectez-vous à l'aide de vos identifiants</p>
            <div></div>
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
            pattern="[A-ZÀ-ÿa-z\s-]{2,100}"
            placeholder="password"
            required
          />

          <button type="submit" name="submit">Se connecter</button>
        </form>

        </main>
        `

    }

    wall(){
        View.header();
        document.body.innerHTML+=/*html*/`
        <main id="main">
            <h1>Bienvenue sur le réseau Groupomania!</h1>
            <section id="articles">
                ${Controller.getArticles()}
            </section>
        </main>
        `
    }

    showProfil(user){
        document.getElementById("main").innerHTML+=/*html*/`
                    <aside>
                        <input id="close" type="button" value="fermer" onclick="Controller.index(); return false">  
                        <h2>${user.userName} ${user.userFirstname} </h2>
                        <p>${user.email}</p>
                        <ul>
                            <li class="link">Mes j'aime</li>
                            <li class="link">Mes commentaires</li>
                            <li class="link">Mes posts</li>
                        </ul>
                    </aside>
                `
    }

    static post(){

        document.body.innerHTML += /*html*/ `
            <div class="customBoxContainer">
                <div class="backgroundBlur"></div>
                <div class="custom-box">
                    <form id="formulaire" onsubmit="Controller.publishPost(this); return false">
                        <input id="close" type="button" value="fermer" onclick="Controller.index(); return false">
                    <label id="articleTitle" for="articleTitle">Titre</label>
                    <input
                        type="text"
                        name="articleTitle"
                        pattern="[A-ZÀ-ÿa-z0-9\s-]{2,100}"
                        placeholder="Titre"
                        required
                    />
                    <label for="text">texte</label>
                    <input
                        id="text"
                        type="textarea"
                        name="text"
                        pattern="[A-ZÀ-ÿa-z0-9\s-]{2,100}"
                        placeholder="Votre texte."
                        required
                    />
                    <label for="text">image</label>
                    <input
                        id="image"
                        type="file"
                        name="image"
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

    showArticles(articles){
        console.log("articles", articles)
        for (let article of articles){
            document.getElementById("articles").innerHTML += /*html*/ `
            <a href="index.html?id=${article.article_id}">
                <article>
                    <h2>${article.article_title}</h2>
                    <p>${article.article_body}</p>
                </article>
            </a>
            `;
        }

    }

    showOneArticle(article) {
        console.log("article", article)
        document.body.innerHTML += /*html*/ `
            <div class="customBoxContainer">
                <div class="backgroundBlur"></div>
                <div class="custom-box" id="oneArticle">
                    <input id="close" type="button" value="fermer" onclick="window.location.replace('index.html')">
                    <div class="article">
                        <h2>${article[0].article_title}</h2>
                        <div>
                            <img src="${article.imageURL}"/>
                        </div>
                        <p>${article[0].article_body}</p>
                    </div>   
                    <div class="like">
                        <a href="#"><i class="far fa-thumbs-up"></i></a>
                        <a href="#"><i class="far fa-thumbs-down"></i></a>
                        
                    </div>
                    <form id="formulaire" onsubmit="Controller.sendComment(this); return false;">
                        <label for="commentaire">Laissez un commentaire</label>
                        <input type="text" name="commentaire"/>
                        <button type="submit"><i class="far fa-paper-plane"></i></button>
                    </form>
                    ${Controller.getComment()};
                </div>
            </div>
        `;

    }

    showComment(comments){
        console.log("Commentaire", comments);
        for (let comment of comments){

        document.getElementById("oneArticle").innerHTML+= /*html*/ `
            <p>${comment.commentaire}</p>

        `
        }
    }
}


