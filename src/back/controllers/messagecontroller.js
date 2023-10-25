const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const port = 3000;
// const router= express.Router();
const connection= require("./../mysql");
const message= require("../class/message");

//////////////////////////////////////////////
//////////////MESSAGES////////////////////////
//////////////////////////////////////////////

//récupération message user
exports.getMessage= (req, res) => {
    const idMessage = req.originalUrl.split("/")[2];
    const sql = `SELECT m.contenu, m.id FROM messages m JOIN utilisateurs u on u.id_message=m.id WHERE u.id = ?`;
    const values = [idMessage];

    console.log(idMessage);

    connection.query(sql, values, (err, rows, fields) => {
      if (err) {
        console.error("Erreur lors de la récupération des messages :", err);
        res.status(500).json({ error: "Erreur lors de la récupération des messages" });
      } else {
        res.status(200).json(rows);
      }
    });
  };
  
  //envoi nouveau message user
  
  // router.post("/user/:idUser/messages/", 
  exports.addMessage=(req, res) => {
    const userData = req.body;
    const idUser = req.originalUrl.split("/")[2];
    const sql = "INSERT INTO messages (isHumain, date_dernier_message, contenu, id_utilisateur) VALUES (?, ?, ?, ?) ";
    const values = [userData.isHumain, userData.date_dernier_message,userData.contenu, idUser];
  
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

  module.exports = exports;