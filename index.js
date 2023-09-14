// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});


// MY CODE FROM HERE
function returnDate(req, res) {
  let inputDate = req.params.date;
  if (Number(inputDate)) {
    let trueDate = new Date(Number(inputDate));
    res.json({ unix: trueDate.valueOf(), utc: trueDate.toUTCString() });
  } else {
    let trueDate = new Date(inputDate);
    if (trueDate.valueOf()) {
      res.json({ unix: trueDate.valueOf(), utc: trueDate.toUTCString() });
    } else {
      res.json({ error: trueDate.toUTCString() })
    }
  };
}

function returnToday(req, res) {
  let ms = Date.now();
  let utc = new Date(ms);
  res.json({ unix: ms, utc: utc.toUTCString() })
}

app.route("/api/:date").get(returnDate).post(returnDate);
app.route("/api",).get(returnToday).post(returnToday);
