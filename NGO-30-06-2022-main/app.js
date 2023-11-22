var express = require('express')
var cors = require('cors')
var app = express()
 
app.use(cors())
 

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With ");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', 'Accept');
    res.header('Access-Control-Allow-Methods','PUT,GET,POST,DELETE')
    next();
});

 
app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})