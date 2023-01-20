const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001
const database = require('./database')

app.use(cors());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/listings', (req, res) => {
    const connection = database.getConnection();
    connection.query('SELECT * FROM Listing', (error, results, fields) => {
        res.json(results);
    });
})

app.listen(port, () =>
{
    console.log(`Example app listening on port ${port}`);
})