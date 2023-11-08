const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const port = 3000;
// const router= express.Router();
const connection = require("./../mysql");
const Message = require("../class/message");
const env = require("dotenv").config();
const jwt = require("jsonwebtoken");
const Chatopenai = require("../class/chatopenai");

//////////////////////////////////////////////
//////////////MESSAGES////////////////////////
//////////////////////////////////////////////

//récupération message user
exports.getMessage = (req, res) => {
  const idMessage = req.originalUrl.split("/")[2];
  const sql = `SELECT m.contenu, m.id FROM messages m JOIN utilisateurs u on u.id_message=m.id WHERE u.id = ?`;
  const values = [idMessage];

  console.log(sql);
  console.log(idMessage);

  connection.query(sql, values, (err, rows, fields) => {
    if (err) {
      console.error("Erreur lors de la récupération des messages :", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des messages" });
    }
    res.status(200).json(rows);
  });
};

// exports.getMessageByPersonnage = (req, res) => {

//   const idPersonnage = req.originalUrl.split("/")[2];
//   const sql = `SELECT m.contenu, m.id FROM messages m JOIN personnages p on p.id_message=m.id WHERE p.id = ?`;
//   const values = [idPersonnage];

//   console.log(sql);
//   console.log(idPersonnage);

//   connection.query(sql, values, (err, rows, fields) => {
//     if (err) {
//       console.error("Erreur lors de la récupération des messages :", err);
//       res.status(500).json({ error: "Erreur lors de la récupération des messages" });
//     }
//       res.status(200).json(rows);
//   });
// };

exports.addMessage = async (req, res) => {
  let message = Message.fromMap(req.body);
  const secretkey = process.env.SECRET_KEY;
  var tokenBearer = req.headers.authorization;
  var token = tokenBearer.split(" ")[1]; // on récupère le token sans le bearer
  var decoded = jwt.verify(token, secretkey); // on décode le token
  var idUser = decoded.id;
  var isHumain = true;

  const sql =
    "INSERT INTO messages (isHumain, date_dernier_message, contenu, id_utilisateur, id_personnage) VALUES (?, NOW(), ?, ?, ?)";
  const values = [isHumain, message.contenu, idUser, message._id_personnage];

  try {
    // First database insert
    const firstInsertResult = await new Promise((resolve, reject) => {
      connection.query(sql, values, (err, result) => {
        if (err) {
          console.error("Erreur lors de l'insertion :", err);
          reject(err);
        } else {
          console.log("Enregistrement inséré avec succès !");
          resolve(result);
        }
      });
    });

    // Generate response and perform the second database insert
    let idPersonnage = message._id_personnage;
    var reponse = await Chatopenai.generateResponseForMessage(idUser, idPersonnage);
    console.log(reponse);

    const sql2 =
      "INSERT INTO messages (isHumain, date_dernier_message, contenu, id_utilisateur, id_personnage) VALUES (?, NOW(), ?, ?, ?)";
    const valuesMessage = [
      reponse.isHumain,
      reponse.contenu,
      reponse.id_utilisateur,
      reponse._id_personnage,
    ];

    const secondInsertResult = await new Promise((resolve, reject) => {
      connection.query(sql2, valuesMessage, (err, result) => {
        if (err) {
          console.error("Erreur lors de l'insertion :", err);
          reject(err);
        } else {
          console.log("Enregistrement inséré avec succès !");
          resolve(result);
        }
      });
    });

    res.status(200).json({ message: "Enregistrement inséré avec succès" });

  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'insertion" });
  }
};

/*exports.addMessage = async (req, res) => {
  let message = Message.fromMap(req.body);
  const secretkey = process.env.SECRET_KEY;
  var tokenBearer = req.headers.authorization;
  var token = tokenBearer.split(" ")[1]; // on récupère le token sans le bearer
  var decoded = jwt.verify(token, secretkey); // on décode le token
  var idUser = decoded.id;
  var isHumain = true;


  const sql =
    "INSERT INTO messages (isHumain, date_dernier_message, contenu, id_utilisateur, id_personnage) VALUES (?, NOW(), ?, ?, ?) ";
  const values = [
    isHumain,
    message.contenu,
    idUser,
    message._id_personnage,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion :", err);
      res.status(500).json({ error: "Erreur lors de l'insertion" });
      let idperso= message.id_personnage;
      console.log(idperso);
      return;
    } else {
      console.log("Enregistrement inséré avec succès !");
      res.status(200).json({ message: "Enregistrement inséré avec succès" });
      // console.log(sql, values);
    }
  });

  let idPersonnage= message._id_personnage;
  var reponse = await Chatopenai.generateResponseForMessage(idUser, idPersonnage);
  console.log(reponse);

  try{

  let sql2 =
        "INSERT INTO messages (isHumain, date_dernier_message, contenu, id_utilisateur, id_personnage) VALUES (?, NOW(), ?, ?, ?) ";
        const valuesMessage = [
          reponse.isHumain,
          reponse.contenu,
          reponse.id_utilisateur,
          reponse._id_personnage,
        ]
        const result = await new Promise((resolve, reject) => {
          connection.query(sql2, valuesMessage, (err, result) => {
            if (err) {
              console.error("Erreur lors de l'insertion :", err);
              reject(err);
            } else {
              console.log("Enregistrement inséré avec succès !");
              resolve(result);
            }
          });
        });
      
        res.status(200).json({ message: "Enregistrement inséré avec succès" }); //multiple appelle de res donc marche pas 
        console.log(result);
      }catch (error) {
        res.status(500).json({ error: "Erreur lors de l'insertion" });
      }

    }*/


      /*

        connection.query(sql2, valuesMessage, (err, result) => {
          if (err) {
            console.error("Erreur lors de l'insertion :", err);
            res.status(500).json({ error: "Erreur lors de l'insertion" });
            let idperso = message.id_personnage;
            console.log(idperso);
            return;
          } else {
            console.log("Enregistrement inséré avec succès !");
            res
            .status(200)
            .json({ message: "Enregistrement inséré avec succès" });
            console.log(result);
  

          }
        });*/



module.exports = exports;
