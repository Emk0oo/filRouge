const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const port = 3000;
const router = express.Router();
const connection = require("./../mysql");

//Récupération de l'ensemble des personnages d'un univers

router.get("/:id/characters", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM personnages WHERE id_univers = ?";
  const values = [id];

  connection.query(sql, values, (err, rows, fields) => {
    if (err) {
      console.error("Erreur lors de la récupération des personnages :", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des personnages" });
    } else {
      res.status(200).json(rows);
    }
  });
});

//Création d'un personnage dans un univers

router.post("/:id/characters", (req, res) => {
  const personnagesData = req.body;
  let sql =
    "INSERT INTO personnages (nom, id_images, id_messages, id_univers) VALUES (?, ?, ?, ?)";
  const values = [
    personnagesData.nom,
    personnagesData.id_images,
    personnagesData.id_messages,
    personnagesData.id_univers,
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
});

//Modification d'un personnage dans un univers

router.put("/:id/characters", (req, res) => {
  const personnagesData = req.body;
  const id = req.params.id;
  let sql =
    "UPDATE personnages SET nom = ?, id_images = ?, id_messages = ?, id_univers = ? WHERE id = ?";
  const values = [
    personnagesData.nom,
    personnagesData.id_images,
    personnagesData.id_messages,
    personnagesData.id_univers,
    id,
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
});

//Suppression d'un personnage dans un univers

router.delete("/:id/characters", (req, res) => {
  const personnagesData = req.body;
  const id = req.params.id;
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
});

module.exports = router;