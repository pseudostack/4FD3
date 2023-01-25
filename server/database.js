const sql = require('mysql2')

// @TODO: move into environment variables for production deploymnet
const host = 'localhost'
const user = 'admin'
const password = 'secret'

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