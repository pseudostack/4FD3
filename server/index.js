const express = require('express')
const cors = require('cors')
const EventEmitter = require('./event.js')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express()
const port = 3001
const database = require('./database')

const pool = database.getPool();
const eventEmitter = new EventEmitter();

async function sleep(ms) {
   return new Promise((resolve) => {
     setTimeout(resolve, ms);
   }).catch(function() {});
 }

async function emitListingInfo() {
   while (true) {
     console.log("inside main function")
      const waitTimeMS = Math.floor(Math.random() * 1000);
      await sleep(waitTimeMS);
      pool.query('SELECT * FROM Listing', (error, results, fields) => {
          eventEmitter.fire(results);
          //console.log("event emitted: " + results);
      });
   }
 }

emitListingInfo();

app.use(express.urlencoded());
app.use(bodyParser.json())
app.use(cors({ credentials: true }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/', function (req, res) {
   const id = Date.now().toString();
   var timer = null;
   const handler = function(event) {
      clearTimeout(timer);
      //console.log('event', event);
      res.status(201);
      res.end(JSON.stringify(event));
   };

   eventEmitter.register(id, handler);
   timer = setTimeout(function(){
      console.log('timeout');
      const wasUnregistered = eventEmitter.unregister(id);
      //console.log("wasUnregistered", wasUnregistered);
      if (wasUnregistered){
         res.status(200);
         res.end();
      }
   }, 5000);
});

app.post('/listingBid',(req, res) => {
    console.log("received bid: " + JSON.stringify(req.body.bid) + " from seller: " + JSON.stringify(req.body.seller) )

    let sql = "UPDATE Listing SET currentBid = ? WHERE Seller = ?";
    let data = [req.body.bid,req.body.seller];

    let query = pool.query(sql, data,(err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

app.get('/listings', (req, res) => {
    pool.query('SELECT * FROM Listing', (error, results, fields) => {
        res.json(results);
    });
})

app.listen(port, () =>
{
    console.log(`Example app listening on port ${port}`);
})
