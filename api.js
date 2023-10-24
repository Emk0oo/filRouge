const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const port = 3000;
const checkToken= require('./src/back/middleware/checktoken')
// jwt
const jwt = require('jsonwebtoken');

app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "abcde",
  database: "fil_rouge",
});

connection.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("connecté");
  }
});

app.use(checkToken);

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.post("/auth", (req, res) => {
  let login= req.body.login;
  let password= req.body.password;
  let requete = `SELECT * FROM utilisateurs WHERE pseudo = '${login}' AND mdp = '${password}'`;
  connection.query(requete, (err, rows, fields) => {
    if (err) {
      res.status(403).json({ error: "utikisateur inconnu" });
    }
    console.log(rows);

if(rows.length == 0) {
      res.status(403).json({ error: "utikisateur inconnu" });
    }

    // jwt
    let id = rows[0]["id"];
    let nom = rows[0]["nom"]
    // let prenom = rows[0].prenom;
    // let pseudo = rows[0].pseudo;

    // generate token
    jwt.sign({id, nom}, 'juxdtjcghtcrgtxrht', (err, token) => {
      res.json({
        token : token
      });
    });

  });
});

app.use('/utilisateurs', require('./src/back/router/userroute'));
app.use('/univers', require('./src/back/router/univerrouter'));
// app.use('/personnages', require('./src/back/router/personnagerouter'));

// controller /univers 
//app.use("/univers", require("./controllers/univers")

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


