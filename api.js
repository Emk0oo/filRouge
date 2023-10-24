const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const port = 3000;

app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "abcde",
  database: "fil_rouge",
});

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

//////////////////////////////////////////////
//////////////UTILISATEURS////////////////////
//////////////////////////////////////////////

app.post("/utilisateurs/add", (req, res) => {
  const userData = req.body;
  const sql = "INSERT INTO utilisateurs (id, nom, prenom, pseudo, mdp, id_message) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [userData.id, userData.nom, userData.prenom, userData.pseudo, userData.mdp, userData.id_message];

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

app.put("/utilisateurs/update/:id", (req, res) => {
  let body = req.body;
  const data = req.body;
  const requete = `UPDATE utilisateurs SET nom = '${body.nom}', prenom = '${body.prenom}', pseudo = '${body.pseudo}', mdp = '${body.mdp}', id_message = '${body.id_message}' WHERE id = '${req.params.id}'`;
  connection.query(requete, function (err, result) {
    if (err) throw err;
    res.send("1 record updated");
  });
});

app.get("/utilisateurs", (req, res) => {

  let requete= "SELECT * FROM utilisateurs";
  connection.query(requete, (err, rows, fields) => {
    if (err) throw err;
    res.status(200).json(rows);
  });
});

app.get("/utilisateurs/:id", (req, res) => {
  connection.query(
    "SELECT * FROM utilisateurs WHERE id= ?",
    [req.params.id],
    (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    }
  );
});

//////////////////////////////////////////////
//////////////UNIVERS/////////////////////////
//////////////////////////////////////////////

// controller /univers 
//app.use("/univers", require("./controllers/univers")

//récupération de l'ensemble des univers

app.get("/univers", (req, res) => {
  connection.query("SELECT * FROM univers", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

//création d'un univers

app.post("/univers/add", (req, res) => {
  const universData = req.body;
  const sql = "INSERT INTO univers (description, id_utilisateurs, nom, id_images, nb_perso) VALUES (?, ?, ?, ?, ?)";
  const values = [universData.description, universData.id_utilisateurs, universData.nom, universData.id_images, universData.nb_perso];
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

app.get("/univers/:id", (req, res) => {
  connection.query(
    "SELECT * FROM univers WHERE id= ?",[req.params.id],(err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    }
  );
});

//Modification d'un univers

app.put("/univers/update/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;

  // Utilisez une requête préparée pour mettre à jour les données
  const sql = "UPDATE univers SET description = ?, id_utilisateurs = ?, nom = ?, id_images = ?, nb_perso = ? WHERE id = ?";
  const values = [body.description, body.id_utilisateurs, body.nom, body.id_images, body.nb_perso, id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour :", err);
      res.status(500).json({ error: "Erreur lors de la mise à jour" });
    } else {
      console.log("Enregistrement mis à jour avec succès !");
      res.status(200).json({ message: "Enregistrement mis à jour avec succès" });
    }
  });
});

//Suppression d'un univers

app.delete("/univers/delete/:id", (req, res) => {
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

//Récupération de l'ensemble des personnages d'un univers

app.get("/univers/:id/characters", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM personnages WHERE id_univers = ?";
  const values = [id];

  connection.query(sql, values, (err, rows, fields) => {
    if (err) {
      console.error("Erreur lors de la récupération des personnages :", err);
      res.status(500).json({ error: "Erreur lors de la récupération des personnages" });
    } else {
      res.status(200).json(rows);
    }
  });
});

//Création d'un personnage dans un univers

app.post("/univers/:id/characters", (req, res) => {
  const personnagesData = req.body;
  let sql="INSERT INTO personnages (nom, id_images, id_messages, id_univers) VALUES (?, ?, ?, ?)";
  const values = [personnagesData.nom, personnagesData.id_images, personnagesData.id_messages, personnagesData.id_univers];
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

app.put("/univers/:id/characters", (req, res) => {
  const personnagesData = req.body;
  const id = req.params.id;
  let sql="UPDATE personnages SET nom = ?, id_images = ?, id_messages = ?, id_univers = ? WHERE id = ?";
  const values = [personnagesData.nom, personnagesData.id_images, personnagesData.id_messages, personnagesData.id_univers, id];
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

app.delete("/univers/:id/characters", (req, res) => {
  const personnagesData = req.body;
  const id = req.params.id;
  let sql="DELETE FROM personnages WHERE id = ?";
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

//////////////////////////////////////////////
//////////////MESSAGES////////////////////////
//////////////////////////////////////////////

//récupération message user
app.get("/user/:idUser/messages/", (req, res) => {
  const idUser = req.params.idUser;
  const sql = `SELECT m.contenu, m.id FROM messages m JOIN utilisateurs u on u.id_message=m.id WHERE m.id = ?`;
  const values = [idUser];

  connection.query(sql, values, (err, rows, fields) => {
    if (err) {
      console.error("Erreur lors de la récupération des messages :", err);
      res.status(500).json({ error: "Erreur lors de la récupération des messages" });
    } else {
      res.status(200).json(rows);
    }
  });
});

//envoi nouveau message user

app.post("/user/:idUser/messages/", (req, res) => {
  const userData = req.body;
  const idUser = req.params.idUser;
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
});

// app.post("/user/:idUser/messages/", (req, res) => {


// });


//////////////////////////////////////////////
//////////////IMAGES//////////////////////////
//////////////////////////////////////////////

app.get("/images", (req, res) => {
  connection.query("SELECT * FROM images", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.post("/images/add", (req, res) => {
  let body = req.body;
  const data = req.body;
  const requete = `INSERT INTO images (id, url) VALUES ('${body.id}', '${body.url}')`;
  connection.query(requete, function (err, result) {
    if (err) throw err;
    res.send("1 record inserted");
  });
});

app.get("/images/:id", (req, res) => {});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

connection.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("connecté");
  }
});
