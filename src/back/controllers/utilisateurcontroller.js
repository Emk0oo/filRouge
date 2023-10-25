const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const port = 3000;
const router = express.Router();
const connection = require("./../mysql");

//////////////////////////////////////////////
//////////////UTILISATEURS////////////////////
//////////////////////////////////////////////

exports.addUser = (req, res) => {
  const userData = req.body;
  const sql =
    "INSERT INTO utilisateurs (id, nom, prenom, pseudo, mdp, id_message) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    userData.id,
    userData.nom,
    userData.prenom,
    userData.pseudo,
    userData.mdp,
    userData.id_message,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion :", err);
      res.status(500).json({ error: "Erreur lors de l'insertion" });
    } else {
      console.log("Enregistrement inséré avec succès !");
      res.status(200).json({ message: "Enregistrement inséré avec succès" });
    }
  });
};

exports.updateUser = (req, res) => {
  let body = req.body;
  const data = req.body;
  const requete = `UPDATE utilisateurs SET nom = '${body.nom}', prenom = '${body.prenom}', pseudo = '${body.pseudo}', mdp = '${body.mdp}', id_message = '${body.id_message}' WHERE id = '${req.params.id}'`;
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

exports.getUserById= (req, res) => {
  connection.query(
    "SELECT * FROM utilisateurs WHERE id= ?",
    [req.params.id],
    (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    }
  );
};



module.exports = exports;
