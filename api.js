const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const port = 3000;

app.use(express.json());



app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.use('/utilisateurs', require('./src/back/router/userroute'));
app.use('/univers', require('./src/back/router/univerrouter'));
app.use('/personnages', require('./src/back/router/personnagerouter'));

// controller /univers 
//app.use("/univers", require("./controllers/univers")

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


