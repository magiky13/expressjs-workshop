var express = require('express');
var app = express();


// app.get('/hello', function(req, res) {
//     res.send('<h1>Hey Mom</h1>');
// });




app.get('/hello', function(req, res) {
    var input = req.query.name;
    res.send(`<h1>Hey ${input}</h1>`);
});







//secret stuff

var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
