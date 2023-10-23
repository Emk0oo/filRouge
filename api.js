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

app.post("/utilisateurs/add", (req, res) => {
  // var { id, nom, prenom, pseudo, mdp, id_message } = req.body;
  // var sql= `INSERT INTO utilisateurs (id, nom, prenom, pseudo, mdp, id_message) VALUES (?, ?, ?, ?, ?, ?)`;
  // var tab=[id, nom, prenom, pseudo, mdp, id_message];
  // connection.query(sql, tab, (err, rows, fields) => {
  //   if (err) throw err;
  //   res.status(200).json(rows);
  // });
  let body = req.body;
  const data = req.body;
  const requete = `INSERT INTO utilisateurs (id, nom, prenom, pseudo, mdp, id_message) VALUES ('${body.id}', '${body.nom}', '${body.prenom}', '${body.pseudo}', '${body.mdp}', '${body.id_message}')`;
  connection.query(requete, function (err, result) {
    if (err) throw err;
    res.send("1 record inserted");
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
//////////////////////////////////////////////
//////////////UTILISATEURS////////////////////
//////////////////////////////////////////////
app.get("utilisateurs", (req, res) => {
  connection.query("SELECT * FROM users", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
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

app.get("/univers", (req, res) => {
  connection.query("SELECT * FROM univers", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.post("/univers/add", (req, res) => {
  let body = req.body;
  const data = req.body;
  const requete = `INSERT INTO univers (id, description, id_utilisateurs, nom, id_images, nb_perso) VALUES ('${body.id}', '${body.description}', '${body.id_utilisateurs}', '${body.nom}', '${body.id_images}', '${body.nb_perso}')`;
  connection.query(requete, function (err, result) {
    if (err) throw err;
    res.send("1 record inserted");
  });
});

app.post("/univers/:id/characters", (req, res) => {
  let body = req.body;
  res.send(req.body);
  let sql = `INSERT INTO personnages (nom, id_images, id_messages, id_univers) VALUES ('${body.nom}', '${body.id_images}', '${body.id_messages}' , ${req.params.id})`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.send("Personnage ajouté avec succès.");
});

app.get("/univers/:id", (req, res) => {
  connection.query(
    "SELECT * FROM univers WHERE id= ?",
    [req.params.id],
    (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    }
  );
});

app.put("/univers/update/:id", (req, res) => {
  let body = req.body;
  const data = req.body;
  const requete = `UPDATE univers SET description = '${body.description}', id_utilisateurs = '${body.id_utilisateurs}', nom = '${body.nom}', id_images = '${body.id_images}', nb_perso = '${body.nb_perso}' WHERE id = '${req.params.id}'`;
  connection.query(requete, function (err, result) {
    if (err) throw err;
    res.send("1 record updated");
  });
});

app.delete("/univers/delete/:id", (req, res) => {
  const requete = `DELETE FROM univers WHERE id = '${req.params.id}'`;
  connection.query(requete, function (err, result) {
    if (err) throw err;
    res.send("1 record deleted");
  });
});

//////////////////////////////////////////////
//////////////PERSONNAGES/////////////////////
//////////////////////////////////////////////

app.get("/personnages", (req, res) => {
  connection.query("SELECT * FROM personnages", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.get("/personnages/:id", (req, res) => {
  connection.query(
    "SELECT * FROM personnages WHERE id= ?",
    [req.params.id],
    (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    }
  );
});

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
