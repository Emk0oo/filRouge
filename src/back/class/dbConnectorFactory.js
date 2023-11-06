const dotenv=require('dotenv').config();

class DbConnectorFactory{

    getDbConnector(){
        switch(process.env.DB_CONNECTOR){
            case "mysql":
                return new MysqlConnector();
            case "mongodb":
                return new MongodbConnector();
            default:
                throw new Error("DB_CONNECTOR not found");

                
        }
    }
}