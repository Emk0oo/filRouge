const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const port = 3000;
//const router = express.Router();
const connection = require("../mysql");
const Personnage = require("../class/personnage");
const Image = require("../class/image");

//Récupération de l'ensemble des personnages d'un univers

exports.getAllPersonnages = (req, res) => {
  const id = req.originalUrl.split("/")[2];
  const sql = "SELECT * FROM personnages WHERE id_univers = ?";
  const values = [id];

  connection.query(sql, values, (err, rows, fields) => {
    if (err) {
      console.error("Erreur lors de la récupération des personnages :", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des personnages" });
      console.log(sql, values);
    } else {
      res.status(200).json(rows);
      console.log(sql, values);
    }
  });
};

//Création d'un personnage dans un univers

exports.addPersonnage = async (req, res) => {
  let personnage = Personnage.fromMap(req.body); //from map
  //get id from url 
  const idUnivers = req.originalUrl.split("/")[2];
  await personnage.genererDescription();
  await personnage.genererPhotoProfil();
  let sql =
    "INSERT INTO personnages (nom, description, id_images, id_univers) VALUES (?, ?, ?, ?)";
  const values = [
    personnage.nom,
    personnage.description.trim(),
    personnage.id_images,
    idUnivers,
  ];
  console.log(values);
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion :", err);
      res.status(500).json({ error: "Erreur lors de l'insertion" });
    } else {
      personnage.id = result.insertId;
      personnage.id_univers = req.params.id;
      console.log("Enregistrement inséré avec succès !");
      res.status(201).json(personnage.toMap());
    }
  });
};

//Modification d'un personnage dans un univers

exports.updatePersonnage = (req, res) => {
  let personnage = Personnage.fromMap(req.body); //from map
  const idCharacter = req.params.idCharacter; //req.params.id;
  console.log(idCharacter);
  let sql =
    "UPDATE personnages SET nom = ?, id_images = ?, id_univers = ? WHERE id = ?";
  const values = [
    personnage.nom,
    personnage.id_images,
    personnage.id_univers,
    idCharacter,
  ];
  console.log(values);
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

//Suppression d'un personnage dans un univers

exports.deletePersonnage = (req, res) => {
  const personnagesData = req.body;
  const id = req.params.idCharacter;
  let sql = "DELETE FROM personnages WHERE id = ?";
  const values = [id];
  console.log(values);
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression :", err);
      res.status(500).json({ error: "Erreur lors de la suppression" });
    } else {
      console.log("Enregistrement supprimé avec succès !");
      res.status(200).json({ message: "Enregistrement supprimé avec succès" });
    }
  });
};

module.exports = exports;
