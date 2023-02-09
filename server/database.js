const sql = require('mysql2')

require('dotenv').config();

const host = 'localhost'
const user = 'admin'
const password = 'secret'

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