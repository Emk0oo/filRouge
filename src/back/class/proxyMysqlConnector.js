const mysql = require("./dbConnectorFactory");

class ProxyMysqlConnector {
  //proxy pattern
  getObject($class, $id) {
    if (this.mysql == null) {
      this.mysql = mysql.getMysqlConnector();
    }
  }

  getAllObjects($class) {
    if (this.mysql == null) {
      this.mysql = mysql.getMysqlConnector();
    }
  }

  searchObjects($class, $filter) {
    if (this.mysql == null) {
      this.mysql = mysql.getMysqlConnector();
    }
  }

  addObject($object) {
    if (this.mysql == null) {
      this.mysql = mysql.getMysqlConnector();
    }
  }

  updateObject($object) {
    if (this.mysql == null) {
      this.mysql = mysql.getMysqlConnector();
    }
  }

  deleteObject($object) {
    if (this.mysql == null) {
      this.mysql = mysql.getMysqlConnector();
    }
  }
}
