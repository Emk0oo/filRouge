const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const port = 3000;

app.use(express.json());



app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.use('/utilisateurs', require('./src/back/controllers/utilisateurcontroller'));
app.use('/univers', require('./src/back/controllers/universcontroller'));

// controller /univers 
//app.use("/univers", require("./controllers/univers")






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


