# filRouge

API permettant de converser avec un personnage fictif dans son univers crée par l'utilisateur. 

## Pré-requis
 - Language:
  
   Cette API est rédigée en NodeJs dans sa version v18.17.1 . 
  
 - Gestionnaire de dépendance:
  
  Le projet utilise npm dans sa version 10.1.0 . 

 - Moteur de base de données:
  
  Le projet utilise MySQL dans sa version 8.0.31 . 


## Installation
*Instruction de mise en place du code*

  1. Cloner le dépot
  ```bash
  git clone https://github.com/Emk0oo/filRouge.git
  ```

  2. Installer les dépendances
  Dans le terminal du projet 

  ```bash
  npm install
  ```

*Mise en place de la structure de la base de données:*

 1. Créer une base de donnée MySQL nommé "fil_rouge"
 2. Importer le fichier fil_rouge.sql depuis le dossier /assets du dépot

*Mise en place de l'environnement* 

  1. Créer le fichier .env à l'aide du .env-example
  2. Créer une secret key pour la création du token
  3. Insérer les clés API :
     * [OpenAI](https://platform.openai.com/docs/quickstart?context=python)
     * [ClipDrop](https://clipdrop.co/apis/docs/text-to-image)
  4. Insérer les identifiants de la BDD MySQL

## Lancement

 1. Vérifier la disponibilité du port 3000
 2. Lancer l'application
    ```bash
    node api.js
    ```

## Utilisation

1. Ouvrir PostMan et importer la collection depuis le dossier assets du projet
2. Créer un utilisateur
3. Créer un token en renseignant le pseudonyme & mot de passe
4. Renseigner le token généré par le projet à chaque requête sur PostMan
5. Creer un univers
6. Creer un personnage
7. Dialoguer avec le personnage
