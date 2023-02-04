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

async function listingTimer(endTime)
{
  var today = Date.parse(new Date().toISOString());
  var listingEndTime = Date.parse(endTime)

  var timeDiff = listingEndTime - today 

  var days = Math.round(timeDiff/(1000*3600*24))
  var hrs = Math.floor((timeDiff % 86400000) / 3600000)
  var mins = Math.floor(((timeDiff % 86400000) % 3600000) / 60000)
  var secs = Math.floor(((((timeDiff % 86400000) % 3600000) / 60000) %1) * 60 )
  var endTimeFormat = ""



  if (days == 1)
  {
    return {'format': 'day',
            'timeDiff': days
          };

  }
  else if (days > 1)
  {
    return {'format': 'days',
            'timeDiff': days
          };
  }
  else if (days == 0 && hrs > 0)
  {
    return {'format': 'hrs',
            'timeDiff': hrs+':'+mins+":"+secs
          };

  }
  else if (days == 0 && hrs ==0 && mins > 0)
  {
    return {'format': 'mins',
            'timeDiff': mins+":"+secs
          };
  }
  else if (days == 0 & hrs ==0 && mins == 0 && secs > 0)
  {
    return {'format': 'secs',
            'timeDiff': secs
          };
  }
  else if (days == 0 & hrs ==0 && mins == 0 && secs == 0)
  {
    return {'format': 'auctionEnded',
            'timeDiff': 'auctionEnded'
          };
  }
  else  {
    console.log("error.  days: " + days + " hrs: " + hrs + " mins: "+mins + " secs: " + secs)
    return {'format': 'error',
            'timeDiff': 'error'
          };
  }
}


var listingsInfo = {};


async function appendListingTimers(res){

    //console.log(res.length)
    for (var i = 0; i< res.length; i++)
    {
      //console.log(res[i].auctionEndTime)
  
        
      listingTimerRet = await listingTimer(res[i].auctionEndTime)

        var format = (listingTimerRet.format)
        var timeDiff = (listingTimerRet.timeDiff)

        //console.log("days: " + days )
        //console.log("timeDiff: " +timeDiff )

       res[i].timeDiff = timeDiff
       res[i].timeFormat = format

     //  console.log(res[i])

       if (i == res.length - 1)
       {
        return res
       }
   
    }


}


async function getListingInfo() {

const listingInfoPromise = new Promise(async(resolve,reject) => 
{
      pool.query('SELECT * FROM Listing', (error, results, fields) => {
        listingsInfo = results;
          //console.log("event emitted: " + results);
          resolve(results)
      });
  })

  return listingInfoPromise;
 }


 function getListingInfoAndEmit() {

getListingInfo().then((res) => {
  listingsInfo = res;
  appendListingTimers(res).then((res2) => {
   // console.log("emitting listings: " + JSON.stringify(res2))
    emitListingInfo(res2);
  })
});
 }
 setInterval(getListingInfoAndEmit,1000);


async function emitListingInfo(res2) {
 // console.log("about to fire results: " + JSON.stringify(res2))
    eventEmitter.fire(res2);
}

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
