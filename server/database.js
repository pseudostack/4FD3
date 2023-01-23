const sql = require('mysql2')

require('dotenv').config();

const host = process.env.HOST
const user = process.env.USER
const password = process.env.PASSWORD

console.log(host, user, password);

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