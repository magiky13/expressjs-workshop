var express = require('express');
var app = express();


// app.get('/hello', function(req, res) {
//     res.send('<h1>Hey Mom</h1>');
// });




// app.get('/hello', function(req, res) {
//     var input = req.query.name; // query says take the object after
//     res.send(`<h1>Hey ${input}</h1>`);
// });

app.get('/calculator/:operation', function(req, res) {
    var op = req.params.operation;
    var numOne = req.query.num1;
    var numTwo = req.query.num2;
    var object = {'operand': op, 'firstOperand': numOne, 'secondOperand': numTwo, 'solution': null};
    var code = 200;

    switch(op) {
        case 'add':
            object.solution = numOne+numTwo;
            break;
        case 'sub':
            object.solution = numOne-numTwo;
            break;
        case 'mult':
            object.solution = numOne*numTwo;
            break;
        case 'div':
            object.solution = numOne/numTwo;
            break;
        default:
            code = 400;
            break;
    }
    res.status(code).send(object);
});








//secret stuff

var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
