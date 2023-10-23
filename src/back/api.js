const express = require('express')
const app = express()
const mysql= require('mysql2')
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'abcde',
    database: 'fil_rouge'
  })
  
connection.connect(function(error){
    if(error){
        throw error;
    }
    else{
        console.log("connecté");
    }
});
  
  /*connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    if (err) throw err
  
    console.log('The solution is: ', rows[0].solution)
  })
  
  connection.end()*/