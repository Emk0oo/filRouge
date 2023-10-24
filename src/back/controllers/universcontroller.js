const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const port = 3000;
const router = express.Router();
const connection = require("./../mysql");

//////////////////////////////////////////////
//////////////UNIVERS/////////////////////////
//////////////////////////////////////////////

//récupération de l'ensemble des univers

router.get("/", (req, res) => {
  connection.query("SELECT * FROM univers", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

//création d'un univers

router.post("/add", (req, res) => {
  const universData = req.body;
  const sql =
    "INSERT INTO univers (description, id_utilisateurs, nom, id_images, nb_perso) VALUES (?, ?, ?, ?, ?)";
  const values = [
    universData.description,
    universData.id_utilisateurs,
    universData.nom,
    universData.id_images,
    universData.nb_perso,
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

//récupération d'un univers

router.get("/:id", (req, res) => {
  connection.query(
    "SELECT * FROM univers WHERE id= ?",
    [req.params.id],
    (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    }
  );
});

//Modification d'un univers

router.put("/update/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;

  // Utilisez une requête préparée pour mettre à jour les données
  const sql =
    "UPDATE univers SET description = ?, id_utilisateurs = ?, nom = ?, id_images = ?, nb_perso = ? WHERE id = ?";
  const values = [
    body.description,
    body.id_utilisateurs,
    body.nom,
    body.id_images,
    body.nb_perso,
    id,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour :", err);
      res.status(500).json({ error: "Erreur lors de la mise à jour" });
    } else {
      console.log("Enregistrement mis à jour avec succès !");
      res
        .status(200)
        .json({ message: "Enregistrement mis à jour avec succès" });
    }
  });
});

//Suppression d'un univers

router.delete("delete/:id", (req, res) => {
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
    }
  });
});

module.exports = router;