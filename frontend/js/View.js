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
            type="text"
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
          id="formulaire"
          name="contact"
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
            type="text"
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

    homePage(){
        document.body.innerHTML=/*html*/`
        <header>
            <nav>
                <ul>
                    <li> <a href=# onclick="Controller.showProfil(this); return false;" >Mon Profil </a></li>
                    <li> <a href=# onclick="Controller.deconnexion(this); return false;" >Déconnexion </a></li>
                    <li> <a href=# onclick="Controller.post(this); return false;" >Créer un post </a></li>
                </ul>  
            </nav>
        </header>
        <main>
            <h1>Bienvenue sur le réseau Groupomania!</h1>
            <section>

            </section>
        </main>
        `
    }

    showProfil(user){
        document.body.innerHTML=/*html*/`
                <header>
                    <nav>
                        <ul>
                            <li> <a href=# onclick="Controller.showProfil(this); return false;" >Mon Profil </a></li>
                            <li> <a href=# onclick="Controller.deconnexion(this); return false;" >Déconnexion </a></li>
                            <li> <a href=# onclick="Controller.post(this); return false;" >Créer un post </a></li>
                        </ul>  
                    </nav>
                </header>
                <main>
                    <h1>Bienvenue sur le réseau Groupomania!</h1>
                    <section>
                        
                    </section>
                    <aside>
                        <h2>${user.userName} ${user.userFirstname} </h2>
                        <p>${user.email}</p>
                        <ul>
                            <li>Mes j'aime</li>
                            <li>Mes commentaires</li>
                            <li>Mes posts</li>
                        </ul>

                    </aside>
                </main>
                `
    }
}
