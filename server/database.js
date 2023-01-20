const sql = require('mysql2')

// @TODO: move into environment variables for production deploymnet
const host = 'localhost'
const user = 'admin'
const password = 'secret'

exports.getConnection = () =>
{
    const connection = sql.createConnection({
        host: host,
        user: user,
        password: password,
        database: 'Gear'
    });
    connection.connect();
    return connection;
}