const connection = require("../mysql");

class MysqlConnector{
    
    getObject($class, $id){
        let sql= "SELECT * FROM " + $class + " WHERE id= ?";
        let values= [$id];
        connection.query(sql, values, (err, rows, fields) => {
            if (err) throw err;
            return $class.fromMap(rows[0]);
        });
    }

    getAllObjects($class){
        let sql= "SELECT * FROM " + $class;
        connection.query(sql, (err, rows, fields) => {
            if (err) throw err;
            let objects= [];
            for(let row of rows){
                objects.push($class.fromMap(row));
            }
            return objects;
        });
    }

    searchObjects($class, $filter){
        let sql= "SELECT * FROM " + $class + " WHERE " + $filter;
        connection.query(sql, (err, rows, fields) => {
            if (err) throw err;
            let objects= [];
            for(let row of rows){
                objects.push($class.fromMap(row));
            }
            return objects;
        });
    }

    addObject($object){
        let sql= "INSERT INTO " + $object.constructor.name + " SET ?";
        let values= $object.toMap();
        connection.query(sql, values, (err, result) => {
            if (err) throw err;
            $object.id= result.insertId;
            return $object;
        });
    }

    updateObject($object){
        let sql= "UPDATE " + $object.constructor.name + " SET ? WHERE id= ?";
        let values= [$object.toMap(), $object.id];
        connection.query(sql, values, (err, result) => {
            if (err) throw err;
            return $object;
        });
    }

    deleteObject($object){
        let sql= "DELETE FROM " + $object.constructor.name + " WHERE id= ?";
        let values= [$object.id];
        connection.query(sql, values, (err, result) => {
            if (err) throw err;
            return true;
        });
    }
}