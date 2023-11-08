const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const port = 3000;
const router = express.Router();
const connection = require("./../mysql");
const Univers = require("../class/univers");

//////////////////////////////////////////////
//////////////UNIVERS/////////////////////////
//////////////////////////////////////////////

//récupération de l'ensemble des univers

exports.getAllUnivers = (req, res) => {
  connection.query("SELECT * FROM univers", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
};

//création d'un univers

exports.addUnivers = async (req, res) => {
  let univers= Univers.fromMap(req.body);
  console.log(req.body); //from map
  //const values = univers.toMap();
  await univers.genererDescription();
  // const universData = req.body;
  await univers.genererImage();
  const sql ="INSERT INTO univers (description, id_utilisateurs, nom, id_images, nb_perso) VALUES (?, ?, ?, ?, ?)";

  const values = [
    univers.description.trim(),
    univers.id_utilisateur,
    univers.nom,
    univers.id_images,
    univers.nb_perso,
  ]
  
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion :", err);
      res.status(500).json({ error: "Erreur lors de l'insertion" });
      console.log(univers.description);
    } else {

      univers.id = result.insertId;
      console.log("Enregistrement inséré avec succès !");
      res.status(200).json({ message: "Enregistrement inséré avec succès" });
    }
  });
};

//récupération d'un univers

exports.getUniversById = (req, res) => {
  connection.query(
    "SELECT * FROM univers WHERE id= ?",
    [req.params.id],
    (err, rows, fields) => {
      if (err) res.status(500).json({ error: "Erreur lors de la récupération" });
        let universes = [];
        for (let row of rows) {
          let universeTemp = Univers.fromMap(row);
          universes.push(universeTemp.toMap());
        }
        res.status(200).json(universes);
    }
  );
};

//Modification d'un univers

exports.updateUnivers = (req, res) => {
  let univers = Univers.fromMap(req.body); //from map
  let id = req.params.id;
  let values = [
    univers.description,
    univers.id_utilisateur,
    univers.nom,
    univers.id_images,
    univers.nb_perso,
    id,
  ];
  let idUnivers = [univers.id];
  console.log(idUnivers);
  // const body = req.body;
  // const id = req.params.id;

  // Utilisez une requête préparée pour mettre à jour les données
  const sql =
    "UPDATE univers SET description = ?, id_utilisateurs = ?, nom = ?, id_images = ?, nb_perso = ? WHERE id = ?";

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour :", err);
      res.status(500).json({ error: "Erreur lors de la mise à jour" });
    } else {
      //console.log("Enregistrement mis à jour avec succès !");
      res
        .status(200)
        .json({ message: "Enregistrement mis à jour avec succès" });
      console.log(values);
    }
  });
};

//Suppression d'un univers

exports.deleteUnivers = (req, res) => {
  const id = req.params.id;

  // Utilisez une requête préparée pour supprimer l'enregistrement
  const sql = "DELETE FROM univers WHERE id = ?";
  const values = [id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression :", err);
      res.status(500).json({ error: "Erreur lors de la suppression" });
    } else {
      console.log("Enregistrement supprimé avec succès !");
      res.status(200).json({ message: "Enregistrement supprimé avec succès" });
      console.log(id);
    }
  });
};

module.exports = exports;
