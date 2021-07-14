# Projet 7 formation Développeur Web

## Backend

Vous êtes sur le backend du réseau interne de Groupomania.

## Installation

- Cloner le dossier se trouvant à l'adresse: https://github.com/lelex86/alexandrabiedermann_p7_21052021.git
- Dans la console, ou terminal, aller dans le dossier backend.
- Tapez npm install pour lancer l'installation.

## Base de données

 Avant de lancer le server, il faut installer la base de données selon la structure ci-dessous, ou fournie dans un fichier séparé.

--
-- Base de données : `groupomania`
--
CREATE DATABASE IF NOT EXISTS `groupomania` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `groupomania`;

-- --------------------------------------------------------

--
-- Structure de la table `articles`
--

CREATE TABLE `articles` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `title` varchar(45) NOT NULL,
  `body` longtext NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `user_id` smallint(5) UNSIGNED NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `commentaires`
--

CREATE TABLE `commentaires` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `user_id` smallint(5) UNSIGNED NOT NULL,
  `article_id` smallint(5) UNSIGNED NOT NULL,
  `commentaire` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `user_id` smallint(5) UNSIGNED NOT NULL,
  `article_id` smallint(5) UNSIGNED NOT NULL,
  `likes` tinyint(1) NOT NULL,
  `dislikes` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `name` varchar(20) NOT NULL,
  `firstname` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id` smallint(5) UNSIGNED NOT NULL,
  `isAdmin` smallint(6) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Index pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`user_id`),
  ADD KEY `fk_article_id` (`article_id`);

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD UNIQUE KEY `user_id` (`user_id`,`article_id`),
  ADD KEY `fk_article` (`article_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `commentaires`
--
ALTER TABLE `commentaires`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD CONSTRAINT `fk_article_id` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `fk_article` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_userId` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
--

## Fichier .env

Créer un fichier .env avec les informations suivantes:

TOKEN_KEY= 'Clé pour le token'  
DB_HOST= 'Nom de l'hôte'  
DB_USER= 'Nom d'utilisateur'  
DB_PWD='mot de passe'  
DB_PATH='chemin d'accès à mysql'  
DB_DATABASE='Nom de la base de données'  

## Démarrage du server

Une fois toutes ces étapes effectuées, lancer le server en effectuant la commande "node server".