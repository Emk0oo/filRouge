const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const port = 3000;
const router = express.Router();
const connection = require("./../mysql");
const utilisateur = require("../class/utilisateur");
const Utilisateur = require("../class/utilisateur");

//////////////////////////////////////////////
//////////////UTILISATEURS////////////////////
//////////////////////////////////////////////

exports.addUser = (req, res) => {
  let utilisateur = Utilisateur.fromMap(req.body); //from map
  //const userData = req.body;
  const sql =
    "INSERT INTO utilisateurs (nom, prenom, pseudo, mdp, id_message) VALUES (?, ?, ?, ?, ?)";

  const values = [
    utilisateur.nom,
    utilisateur.prenom,
    utilisateur.pseudo,
    utilisateur.mdp,
    utilisateur.id_message,
  ];

  // const values = [
  //   // userData.id, remetrre id dans requete si marche pas
  //   userData.nom,
  //   userData.prenom,
  //   userData.pseudo,
  //   userData.mdp,
  //   userData.id_message,
  // ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion :", err);
      res.status(500).json({ error: "Erreur lors de l'insertion" });
    } else {
      console.log("Enregistrement inséré avec succès !");
      res.status(200).json(utilisateur.toMap());
    }
  });
};

exports.updateUser = (req, res) => {
  let utilisateur = Utilisateur.fromMap(req.body); //from map
  // let body = req.body;
  // const data = req.body;
  const requete = `UPDATE utilisateurs SET nom = '${utilisateur.nom}', prenom = '${utilisateur.prenom}', pseudo = '${utilisateur.pseudo}', mdp = '${utilisateur.mdp}', id_message = '${utilisateur.id_message}' WHERE id = '${req.params.id}'`;
  connection.query(requete, function (err, result) {
    if (err) throw err;
    res.send("1 record updated");
  });
};

exports.getAllUsers = (req, res) => {
  let requete = "SELECT * FROM utilisateurs";
  connection.query(requete, (err, rows, fields) => {
    if (err) throw err;
    res.status(200).json(rows);
  });
};

exports.getUserById = (req, res) => {
  connection.query(
    "SELECT * FROM utilisateurs WHERE id= ?",
    [req.params.id],
    (err, rows, fields) => {
      if (err) {
        throw err;
      } else {
        let utilisateur = [];
        for (let row of rows) {
          let utilisateurTemp = Utilisateur.fromMap(row);

          utilisateur.push(utilisateurTemp.toMap());
        }

        res.status(200).json(utilisateur);
        //res.send(rows);
      }
    }
  );
};

module.exports = exports;
