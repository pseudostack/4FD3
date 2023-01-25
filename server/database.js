const sql = require('mysql2')

require('dotenv').config();

const host = process.env.HOST
const user = process.env.USER
const password = process.env.PASSWORD

console.log(host, user, password);

exports.getPool = () =>
{
    return sql.createPool({
        connectionLimit: 100,
        host: host,
        user: user,
        password: password,
        database: 'Gear'
    });
}