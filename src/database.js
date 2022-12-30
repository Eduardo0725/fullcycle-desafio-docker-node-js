const mysql = require('mysql');

const tableName = 'people';

const con = mysql.createConnection({
    host: 'db',
    database: "database",
    user: 'root',
    password: 'root',
});

con.createUsersTableIfNotExists = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS ${tableName} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL
        );
    `;

    con.query(sql, (err, result) => {
        if (err) throw err;

        console.log(result);
    });
}

con.setUsers = (name, success, error) => {
    const sql = `INSERT INTO ${tableName} (name) VALUES ("${name}");`;
    con.query(sql, (err, result) => err ? error(err) : success(result));
}

con.getUsers = (success, error) => {
    const sql = `SELECT * FROM ${tableName}`;
    con.query(sql, (err, result) => err ? error(err) : success(result));
}

con.connect((err) => {
    if (err) {
        throw err;
    }

    con.createUsersTableIfNotExists();
    console.log("Connected!");
});

module.exports = con;
