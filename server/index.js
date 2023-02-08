const express = require('express')
const cors = require('cors')
const EventEmitter = require('./event.js')
var bodyParser = require('body-parser')
const multer  = require('multer')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const { S3Client, ListObjectsCommand } = require('@aws-sdk/client-s3')
const multerS3 = require('multer-s3')
const uuid = require('uuid');
const uuidv4 = uuid.v4;

const app = express()
const port = 3001
const database = require('./database')

const pool = database.getPool();
const eventEmitter = new EventEmitter();

const s3 = new S3Client({
  credentials: {
    accessKeyId: 'AKIAY3K2KOHOJXBMASM3',
    secretAccessKey: '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'
  },
  region: 'us-east-1'
});

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
      pool.query('SELECT * FROM Listing', async (error, results, fields) => {
        for (let listing of results)
        {
          const prefix = listing.listingID + '/pictures/'
          let response = await s3.send(new ListObjectsCommand({
            Prefix: prefix,
            Bucket: 'auctionlistingpics',
          }))

          listing.mainPicture = 'https://auctionlistingpics.s3.amazonaws.com/' + listing.listingID + '/main'
          listing.pictures = response?.Contents
            ?.filter(c => c.Key !== prefix)
            ?.map(c => 'https://auctionlistingpics.s3.amazonaws.com/' + c.Key) ?? []
        }
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
    pool.query('SELECT * FROM Listing', async (error, results, fields) => {   
        res.json(results);
    });
})

app.post('/create', (req, res) => {
  pool.query('INSERT INTO Listing (VIN, Description, UserId, Year, Make, Model, Body, startingBid, floorBid, auctionStartTime, auctionEndTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
   [req.body.vin, req.body.description, null, '2342', 'Toyota', 'Prius', 'SUV', 0, 500, '2023-01-20 21:29:00', '2023-03-10 21:29:00'], (err, results) => {
    const id = results.insertId;
    const upload = multer({
      storage: multerS3({
        s3: s3,
        bucket: 'auctionlistingpics',
        key: function (req, file, cb) {
          if (file.fieldname === 'mainPicture')
          {
            cb(null, id + '/main')
          }
          else
          {
            cb(null, id + '/pictures/' + uuidv4())
          }
        },
        contentType: function(req, file, cb) {
          cb(null, file.mimetype)
        }
      })
    })

    upload.fields([{ name: 'mainPicture', maxCount: 1 }, { name: 'pictures', maxCount: 20 }])(req, {}, function (err) {
      if (err) throw err

      res.status(200);
      res.end();
    })
  })
})

app.listen(port, () =>
{
    console.log(`Example app listening on port ${port}`);
})
