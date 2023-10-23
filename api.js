const express = require("express");
const app = express();
const mysql = require("mysql2");
const port = 3000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "abcde",
  database: "fil_rouge",
});

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/univers", (req, res) => {
  connection.query("SELECT * FROM univers", (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

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

/*connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    if (err) throw err
  
    console.log('The solution is: ', rows[0].solution)
  })
  
  connection.end()*/
