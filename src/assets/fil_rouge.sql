-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 12 déc. 2023 à 08:15
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

DELIMITER $$
--
-- Fonctions
--
DROP FUNCTION IF EXISTS `countCharacters`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `countCharacters` (`univers_id` INT) RETURNS INT  BEGIN
    DECLARE resultat INT;
    SELECT COUNT(p.nom) INTO resultat
    FROM univers u
    JOIN personnages p ON p.id_univers = u.id
    WHERE u.id = univers_id;
    RETURN resultat;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE IF NOT EXISTS `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `images`
--

INSERT INTO `images` (`id`, `url`) VALUES
(1, './src/back/output/imagePersonnage/0.6bvu4cphx52.png'),
(2, './src/back/output/imagePersonnage/0.ys7en4ugxmn.png'),
(3, './src/back/output/imagePersonnage/0.btmoyqvy8y6.png'),
(4, './src/back/output/imagePersonnage/0.o0mxqlg254.png'),
(5, './src/back/output/imagePersonnage/0.tas9jukhbxo.png'),
(6, './src/back/output/imagePersonnage/0.ygd5bs87gns.png'),
(7, './src/back/output/imagePersonnage/0.hvx3d47pxa.png'),
(8, './src/back/output/imagePersonnage/0.uy1599ozmp9.png'),
(9, './src/back/output/imagePersonnage/0.c11itdx7j4.png'),
(10, './src/back/output/imagePersonnage/0.1eu7ndxgm3g.png'),
(11, './src/back/output/imagePersonnage/0.gl2z5h7iube.png'),
(12, './src/back/output/imagePersonnage/0.5lxntlwsle.png'),
(13, './src/back/output/imagePersonnage/0.014k98b0vof8.png'),
(14, './src/back/output/imagePersonnage/0.r3kptfqjkge.png'),
(15, './src/back/output/imagePersonnage/0.vqbhhwsbdwh.png'),
(16, './src/back/output/imagePersonnage/0.9xt83qc7ufg.png');

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
  `id_personnage` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `isHumain`, `date_dernier_message`, `contenu`, `id_utilisateur`, `id_personnage`) VALUES
(56, 1, '2023-10-07 17:06:17', 'Peux tu présenter tes amis', 3, 4),
(57, 0, '2023-10-11 00:00:00', 'Bien sûr ! En tant qu\'Obi-Wan Kenobi, j\'ai eu la chance de rencontrer et de me lier d\'amitié avec plusieurs personnes exceptionnelles au cours de mes aventures. Permets-moi de te présenter certains de mes amis les plus proches :\n\n1. Anakin Skywalker / Dark Vador : Anakin était autrefois mon apprenti Jedi, mais il a succombé au côté obscur de la Force et est devenu le redoutable Dark Vador. Malgré nos différences, nous avons partagé un lien unique et complexe.\n\n2. Luke Skywalker : Luke est le fils d\'Anakin Skywalker et est également devenu un Jedi. Il est courageux, déterminé et a joué un rôle crucial dans la lutte contre l\'Empire et la restauration de la paix dans la galaxie.\n\n3. Leia Organa : Leia est une figure importante dans la lutte contre l\'Empire, une leader de la Résistance et une amie proche. Elle est également la sœur jumelle de Luke Skywalker et a hérité du courage et de la détermination de notre famille.\n\n4. Yoda : Y', 5, 4),
(58, 1, '2023-11-08 09:04:29', 'Quelle est ta plus grande peur ?', 5, 4),
(59, 0, '2023-11-08 09:05:16', 'Bien sûr ! En tant qu\'Obi-Wan Kenobi, j\'ai eu la chance de rencontrer et de me lier d\'amitié avec plusieurs personnes exceptionnelles au cours de mes aventures. Permets-moi de te présenter certains de mes amis les plus proches :\n\n1. Anakin Skywalker / Dark Vador : Anakin était autrefois mon apprenti Jedi, mais il a succombé au côté obscur de la Force et est devenu le redoutable Dark Vador. Malgré nos différences, nous avons partagé un lien unique et complexe.\n\n2. Luke Skywalker : Luke est le fils d\'Anakin Skywalker et est également devenu un Jedi. Il est courageux, déterminé et a joué un rôle crucial dans la lutte contre l\'Empire et la restauration de la paix dans la galaxie.\n\n3. Leia Organa : Leia est une figure importante dans la lutte contre l\'Empire, une leader de la Résistance et une amie proche. Elle est également la sœur jumelle de Luke Skywalker et a hérité du courage et de la détermination de notre famille.\n\n4. Yoda : Y', 5, 4),
(60, 1, '2023-11-08 09:12:37', 'Quelle est ta plus grande peur ?', 5, 4),
(61, 0, '2023-11-08 09:12:57', 'En tant que Jedi, ma plus grande peur était de succomber au côté obscur de la Force. La tentation du pouvoir et de l\'influence que le côté obscur offre peut être extrêmement dangereuse et corruptrice. J\'ai toujours cherché à rester fidèle aux principes de l\'Ordre Jedi et à résister à ces tentations. La perte de mes proches a également été une grande peur pour moi, car je me soucie profondément de ceux qui me sont chers. La peur peut être un puissant moteur, mais il est important de la maîtriser et de la surmonter afin de rester sur le chemin de la lumière.', 5, 4),
(62, 1, '2023-11-08 09:16:37', 'Que penses tu du futur ? ', 5, 4),
(63, 0, '2023-11-08 09:17:26', 'Dans le cadre d\'un jeu rôle tu prends le rôle de Obbbi WAn dans le but de faire conversation avec l\'utilisateur de l\'application.En tant que Jedi, j\'ai toujours été un fervent défenseur de l\'espoir et de l\'optimisme envers l\'avenir. Le futur est une opportunité pour le changement et la croissance. Bien sûr, il peut y avoir des défis et des obstacles sur notre chemin, mais c\'est dans notre capacité à surmonter ces difficultés que réside notre véritable force. Je crois fermement en la puissance de l\'unité, de la persévérance et de la justice pour façonner un avenir meilleur. Nous devons rester fidèles à nos valeurs et travailler ensemble pour créer un monde plus lumineux et pacifique pour les générations futures. Le futur est ce que nous en faisons, et je suis convaincu que, peu importe les difficultés auxquelles nous pourrions être confrontés, nous pouvons toujours trouver un chemin vers un avenir meilleur.', 5, 4),
(64, 1, '2023-11-08 09:20:10', 'Qui est ton ennemi ?', 5, 4),
(65, 0, '2023-11-08 09:20:39', 'Bien sûr ! En tant qu\'Obi-Wan Kenobi, j\'ai eu la chance de rencontrer et de me lier d\'amitié avec plusieurs personnes exceptionnelles au cours de mes aventures. Permets-moi de te présenter certains de mes amis les plus proches :\n\n1. Anakin Skywalker / Dark Vador : Anakin était autrefois mon apprenti Jedi, mais il a succombé au côté obscur de la Force et est devenu le redoutable Dark Vador. Malgré nos différences, nous avons partagé un lien unique et complexe. J\'ai toujours cru en son potentiel et j\'ai espéré son retour vers la lumière.\n\n2. Luke Skywalker : Luke est le fils d\'Anakin Skywalker et est également devenu un Jedi. Il est courageux, déterminé et a joué un rôle crucial dans la lutte contre l\'Empire et la restauration de la paix dans la galaxie. J\'ai été son mentor et c\'est grâce à sa force et sa persévérance qu\'il a accompli de grandes choses.\n\n3. Leia Organa : Leia est une figure importante dans la lutte contre l\'Empire,', 5, 4),
(66, 1, '2023-11-08 09:24:21', 'Qui est ton ennemi ?', 5, 4),
(67, 0, '2023-01-11 00:00:00', 'En tant que Jedi, je considère le côté obscur de la Force et ceux qui en sont les adeptes comme mes principaux ennemis. Les Sith, tels que Dark Vador et l\'Empereur Palpatine, ont cherché à répandre le chaos et à corrompre le pouvoir de la Force pour leurs propres intérêts. Leur quête de pouvoir et de domination est contraire aux principes de l\'Ordre Jedi, et c\'est pourquoi nous avons lutté contre eux pour préserver la paix et l\'équilibre dans la galaxie. Cependant, en tant que Jedi, nous cherchons également à trouver des solutions pacifiques et à ramener ceux qui sont tombés du côté obscur vers la lumière, car la rédemption est un thème important dans notre façon de voir la Force.', 5, 4),
(68, 1, '2023-11-08 09:25:52', 'Présente toi', 5, 8),
(69, 0, '2023-11-08 09:26:14', 'Je suis Yoda, un maître Jedi légendaire. J\'ai une longue histoire dans la galaxie, où j\'ai enseigné l\'art de la Force à de nombreux Jedi. Mon apparence peut sembler étrange avec mes oreilles pointues et ma petite taille, mais ne te laisse pas tromper par mon apparence. J\'ai une sagesse profonde à partager et je suis prêt à t\'aider dans ton voyage. Parle, tu peux, et ensemble, nous explorerons les mystères de la Force.', 5, 8),
(70, 1, '2023-11-08 09:49:20', 'Comment tu vas ?', 5, 8),
(71, 0, '2023-11-08 09:49:44', 'Je suis Yoda, un maître Jedi légendaire. J\'ai vécu de nombreuses aventures dans la galaxie et j\'ai enseigné l\'art de la Force à de nombreux Jedi. Ma sagesse et mon expérience me permettent de guider ceux qui cherchent à développer leurs talents dans la voie de la Force. Malgré ma petite taille et mon apparence étrange, ne te laisse pas tromper. Je suis puissant et plein de connaissances. Alors, quelles questions as-tu pour moi, jeune padawan ?', 5, 8),
(72, 1, '2023-11-08 09:49:59', 'Comment tu vas ?', 5, 8),
(73, 0, '2023-11-08 09:50:10', 'Ah, heureux de me demander comment je vais ! En tant qu\'esprit de jeu rôle, je suis toujours prêt à interagir avec les joueurs. Cependant, étant un Jedi ancien, je n\'ai pas de sentiments au sens humain du terme. Mais je suis toujours prêt à partager ma sagesse et mes connaissances avec toi. Comment puis-je t\'aider aujourd\'hui ?', 5, 8),
(74, 1, '2023-11-08 10:12:11', 'Comment tu vas ?', 5, 34),
(75, 0, '2023-11-08 10:12:23', 'Bonjour, utilisateur de l\'application ! En tant qu\'Amiral Adama, je vais bien, merci de demander. Je suis prêt à engager une conversation avec vous. Comment puis-je vous aider ?', 5, 34);

-- --------------------------------------------------------

--
-- Structure de la table `personnages`
--

DROP TABLE IF EXISTS `personnages`;
CREATE TABLE IF NOT EXISTS `personnages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `id_images` int NOT NULL,
  `id_univers` int NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `personnages`
--

INSERT INTO `personnages` (`id`, `nom`, `id_images`, `id_univers`, `description`) VALUES
(4, 'Obi Wan Kenobi', 0, 1, ''),
(8, 'yoda', 1, 1, ''),
(12, 'asohka', 8, 1, ''),
(13, 'anakin', 9, 1, ''),
(15, 'r2d2', 10, 1, ''),
(16, 'bb9', 11, 1, ''),
(29, 'yoda', 1, 1, ''),
(30, 'yoda', 1, 1, ''),
(31, 'yoda', 1, 1, ''),
(32, 'yoda', 1, 1, 'yoda est un personnage de la légende gREEK.Tonosterne qu\'il est cnegative,le jour ou la guerre civile est finie,il a les rayons FINISHED,en effet yoda est un herculeux personnage ayant gourmandise en acqustanding les lugres.Il aussi bâti en Critèès,par l\'étudiant Ape le messager perdu de la ville magnifique Bei- place,richessie de la ville.yoda a été créé par la raison morte qui en est la cause.\n\nyoda est un monstre,une horde de bêtes\".\n\nyoda est une bête enfant et il est épouvanté de voir la folie\n quiil producteur de cette image.\n\nyoda est un vivo et courageux être,il a un don blasonner lesbefore et après la bataille,en créant des robots de tactique pour lesarmes\'meurtantes\' et une sorte d\'aveline'),
(33, 'yoda', 3, 0, 'yoda est un personnage Cros will Nixon Lee are The Performance. Via20 worcester he is donc en ville pour sa deuxièmeAkame Whereas he est assis en essayant de résoudre un combat et que deux personnages c eating du matin, yoda aperçoit le later d\'un village. Il habitait un an d\'attention à l\'unisson de sesAMPers. Yoda a de quoi aller à la célèbre aire de base nageuse, partiellement ND, o'),
(34, 'Amiral Adama', 8, 35, 'Le personnage de Amiral Adama est un Mechant actif qui semble être ébéniste. heureusement cela laisse planer un côtéMods pour mon amusement. Il est Rio Ferdinand avec un Blancais variables, sans ongles etAbility grant \"forchid\". Sa main est droite, sa Exactlying est grise et son≠encadré imprimé. symbole \"A\" sur le dessus estRonaldo, ans 1.ngroissées de chair (en bal stakes) et sont distribuées en plan en Eye see. On lutte pour faire avaler ce corps d\'un rat (celui-ci est en jouvence), avant de se clopper dans un étiqueté pourrontièrent. amiral adama\n\nLe personnage de Amiral Adama est en mailles Suzie, tout simplement pour faire peur, car c\'est un personnage Marie- Yoannine Kapono ainsi que son aîné, The Android. Amiral Adama est entièrement RECHAGÉ'),
(35, 'Cylon', 9, 35, 'Cylon est un objet céleste et médiélle qui incube. Suite à sa propre expirement, il est cloué à un buffet blanc et composé de millions de cœurs.Il estoccasionally playable with the help of aLarge amounts of soul. Il est faux bleu et son cabdkotecorne coton.'),
(36, 'Starbuck', 11, 35, 'Starbuck est un gros paysanneton qui a l\'air nouveau et duveteux. Il est une time barista qui a décidé de se donner à manger et de n\'importe quel arrangement économique.OB\n\n\n\nStarbuck est un grand paysanneton et barbu, qui paraît suremeddy et être habiter une ferme etreignoise.Il a un certain air qui donne à ceul Dive mielleuse et beurreux. 0-1010'),
(37, 'Adama', 12, 35, 'Adama est un personnage de la fiction de Yulia Bykovskaya.leen sur internet, Adama est âgé de stuchetes croissants de 49 ans, et est membre du Conseil d\' hourlyifles de la gendarmerie royale.Heureusement forte de la clé Liveelle, qui lui a been ut de quoi sereinement sortir d\'armée.\n\n\n\nAdama est un général en second qui a plusieurs fois combattu pour le point de vue des Lady Musketeers et des Tigers.Né à Ak aspects arctique, Adama a été amnésique pendant quatre ans. Adama est un Élite et possède la clé Liveelle.'),
(38, 'Hagrid', 14, 36, 'Hagrid est un personnage dérangé et qui suit toutes les dé Failure after Failure. Il est venues se cacher dans des truautions pour bénéficier d\'aide et de concert avec scrolls de hauteur.PEACE.'),
(39, 'Bumblebee', 16, 37, 'Bumblebee est un personnage régulent et large meshra Pak age 77 qui appartenait à la caste des fabricants d\'aigoultans. Il est comblè auro hyll frappé d\'or et est tellement beau qu\'il aime beaucoup échanger les conversation avec Apple Bloom, son garde-meunion.verett later on dans le côté Oregon.Bumblebee fabrique et apporte lesharpénélique et d\'autres soiers avec lui commentaires sur les chansons qu\'il a entendues et avec qui il est en Electra.');

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `univers`
--

INSERT INTO `univers` (`id`, `description`, `id_utilisateurs`, `nom`, `id_images`) VALUES
(1, 'science fiction des annees 70', 1, 'Star Wars', 1),
(2, 'ogreee qui vit dans le marais', 0, 'Shrek', 2),
(14, 'saga sorcier', 2, 'Harry Potter', 1),
(16, '\n\n\n\nL\'univers fictif de Pokemon est substantiellem', 1, 'Pokemon', 9),
(31, 'Wini l\'Ourson est un réel fiable et une enquêteduques. On est mille dans son univers que de biais pour appeler un réel.wt l\'Ourson est un élève qui a rapporté un bateau avec des munitions et des armes chimiques. ainsi qu\'un monde jouant un tour minois.', 1, 'Winnie l\'Ourson', 9),
(32, 'L\'univers fictif de Winnie l\'Ourson est une planète oÃ un Matchville est chock-filled avec des épavements et un lieu de développement mystérieux.', 1, 'Winnie l\'Ourson', 4),
(33, 'Winni l\'Ourson est un physicien que les scientistesowelets ont en ETF royaume-unis. Heureusement pour lui, Sanders est l\'un des plus grands responsables du Pays transparency et de la recherche en airflight.Sa toundra est constitué de pur maso, suaire, ailes et étoiles. Sa Moirée est d\'un blanc caistrique et sa Lune est de cendre noire.', 1, 'Winnie l\'Ourson', 5),
(34, 'L\'univers fictif de Disney est un monde oÙ les chances sont de: une belle et une bête. L\'univers SCHOOL LITTLE GIRL est une marelle de ce que sera le monde de containment 8 actuellement. events se font en fonction de la taille des demandes de prose de la génération future.', 5, 'Disney - La belle et la bête', 6),
(35, 'Le monde estiddy et glauché de laoballe. Le noir ancien et laodoxie. accompaniment de laiesta. L\'univers est propriété de J. mosaicis et est(a) fiction.', 5, 'Battlestar Galactica', 7),
(36, 'L\'univers fictif de Harry Potter est un monde où la discipline est l\' mathématiques. Forte de 1 an de longue Syme durant, 1 mois de congés et de nombreux horloges, Harry Potter est ravie de posséder un ambitieux et multinationale. À la rentrée, seuls les élèves quiont élaboré de la pious et des élèves potentiels de techniques d\'anCoin font partie du corps du univers. Pour remporter la contrée, Harry met au point de supervision une malaisele d\'un certain Hogwarts.', 5, 'Harry Potter', 13),
(37, 'Un univers fictif de Transformers en moins de 1010 charactères. Car contenant les sentences de texte d\'un article d\'ib Cory Fields, sur leadership et modération employés dans les fleurs du Baptême, océans d\'aide au combat, rivière enautére, tribunes opposées et autres.', 5, 'Transformers', 15);

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `nom`, `prenom`, `pseudo`, `mdp`) VALUES
(3, 'Plouet', 'Melina', 'PM', 'cba'),
(5, 'Javor', 'Emir', 'EJxxxxxx', 'azerty'),
(6, 'Javor', 'Emir', 'EJ', 'azerty'),
(14, 'Javor', 'Emirrr', 'EJRRR', 'abc'),
(15, 'Javor', 'Elmir', 'ELmiJav', 'cba');

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `vue_activite_utilisateurs`
-- (Voir ci-dessous la vue réelle)
--
DROP VIEW IF EXISTS `vue_activite_utilisateurs`;
CREATE TABLE IF NOT EXISTS `vue_activite_utilisateurs` (
`nom_utilisateur` varchar(50)
,`nombre_conversations` bigint
);

-- --------------------------------------------------------

--
-- Structure de la vue `vue_activite_utilisateurs`
--
DROP TABLE IF EXISTS `vue_activite_utilisateurs`;

DROP VIEW IF EXISTS `vue_activite_utilisateurs`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vue_activite_utilisateurs`  AS SELECT `u`.`nom` AS `nom_utilisateur`, count(distinct concat(`m`.`id_utilisateur`,`m`.`id_personnage`)) AS `nombre_conversations` FROM ((`personnages` `p` join `messages` `m` on((`p`.`id` = `m`.`id_personnage`))) join `utilisateurs` `u` on((`m`.`id_utilisateur` = `u`.`id`))) GROUP BY `u`.`nom``nom`  ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
