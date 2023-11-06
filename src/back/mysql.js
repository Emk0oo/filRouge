const mysql = require("mysql2");

class MysqlSingleton{
  static instance;

  static getInstance(){
    if(!MysqlSingleton.instance){
      MysqlSingleton.instance= mysql.createConnection({
        host: "localhost",
        user: "admin",
        password: "abcde",
        database: "fil_rouge",
      });
    }
    return MysqlSingleton.instance;
  }
}

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


module.exports = connection;