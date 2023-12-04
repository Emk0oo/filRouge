-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 27 oct. 2023 à 18:02
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `fil_rouge`
--

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE IF NOT EXISTS `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `isHumain` tinyint(1) NOT NULL,
  `date_dernier_message` datetime NOT NULL,
  `contenu` text NOT NULL,
  `id_utilisateur` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `isHumain`, `date_dernier_message`, `contenu`, `id_utilisateur`) VALUES
(3, 1, '2023-10-24 08:48:45', 'jzebfjzbfjkabfkjazbfjzabf', 3),
(5, 1, '2023-10-24 08:48:45', 'vzehvuiazyudazygf', 5),
(7, 0, '0000-00-00 00:00:00', 'abcdefg', 0),
(8, 1, '0000-00-00 00:00:00', 'abcdefg', 5),
(9, 1, '0000-00-00 00:00:00', 'abcdefghijlkmnopqrst', 4),
(10, 1, '0000-00-00 00:00:00', 'azerty', 4),
(11, 1, '0000-00-00 00:00:00', 'test postman', 4),
(12, 1, '0000-00-00 00:00:00', 'mon message', 6);

-- --------------------------------------------------------

--
-- Structure de la table `personnages`
--

DROP TABLE IF EXISTS `personnages`;
CREATE TABLE IF NOT EXISTS `personnages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `id_images` int NOT NULL,
  `id_messages` int NOT NULL,
  `id_univers` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `personnages`
--

INSERT INTO `personnages` (`id`, `nom`, `id_images`, `id_messages`, `id_univers`) VALUES
(7, 'Obbbi WAn', 0, 0, 0),
(8, 'yoda', 1, 1, 1),
(12, 'asohka', 8, 5, 1),
(13, 'anakin', 9, 9, 1),
(14, 'r2d2', 10, 10, 1),
(15, 'r2d2', 10, 10, 1),
(16, 'bb9', 11, 11, 1);

-- --------------------------------------------------------

--
-- Structure de la table `univers`
--

DROP TABLE IF EXISTS `univers`;
CREATE TABLE IF NOT EXISTS `univers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `id_utilisateurs` int NOT NULL,
  `nom` varchar(50) NOT NULL,
  `id_images` int NOT NULL,
  `nb_perso` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `univers`
--

INSERT INTO `univers` (`id`, `description`, `id_utilisateurs`, `nom`, `id_images`, `nb_perso`) VALUES
(1, 'science fiction des annees 70', 1, 'Star Wars', 1, 1),
(2, 'ogre qui vit dans le marais', 1, 'Shrek', 2, 2),
(13, 'ogre qui vit dans le marais', 1, 'Shrek', 2, 2),
(14, 'saga sorcier', 2, 'Harry Potter', 1, 3),
(16, '\n\n\n\nL\'univers fictif de Pokemon est substantiellem', 1, 'Pokemon', 9, 2),
(31, 'Wini l\'Ourson est un réel fiable et une enquêteduques. On est mille dans son univers que de biais pour appeler un réel.wt l\'Ourson est un élève qui a rapporté un bateau avec des munitions et des armes chimiques. ainsi qu\'un monde jouant un tour minois.', 1, 'Winnie l\'Ourson', 9, 2);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `pseudo` varchar(50) NOT NULL,
  `mdp` varchar(50) NOT NULL,
  `id_message` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `nom`, `prenom`, `pseudo`, `mdp`, `id_message`) VALUES
(3, 'Plouet', 'Melina', 'PM', 'cba', 3),
(5, 'Javor', 'Emir', 'EJxxxxxx', 'azerty', 5),
(6, 'Javor', 'Emir', 'EJ', 'azerty', 5),
(14, 'Javor', 'Emirrr', 'EJRRR', 'abc', 8);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
