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

module.exports = MysqlSingleton.getInstance();
