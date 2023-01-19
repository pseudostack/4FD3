const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

const listings = require('./listings.json')

app.use(cors());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/listings', (req, res) => {
    // for now, I'm simulating a load time here, @TODO: remove this later.
    setTimeout(() => {
        res.json(listings);
    }, 1000);
})

app.listen(port, () =>
{
    console.log(`Example app listening on port ${port}`);
})