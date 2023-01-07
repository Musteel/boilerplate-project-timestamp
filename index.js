// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  const dateString = req.params.date;

  if (!dateString) {
    // If the date parameter is not provided, get the current time
    const date = new Date();
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  } else {
    // Check if the date parameter is a number
    if (Number.isInteger(Number(dateString))) {
      // If it is a number, parse it as a Unix timestamp
      const date = new Date(Number(dateString));

      // Check if the date is valid
      if (date.toString() === 'Invalid Date') {
        res.status(400).json({ error: 'Invalid Date' });
      } else {
        res.json({
          unix: date.getTime(),
          utc: date.toUTCString()
        });
      }
    } else {
      // If the date parameter is not a number, parse it as a string
      const date = new Date(dateString);

      if (date.toString() === 'Invalid Date') {
        res.status(400).json({ error: 'Invalid Date' });
      } else {
        res.json({
          unix: date.getTime(),
          utc: date.toUTCString()
        });
      }
    }
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
