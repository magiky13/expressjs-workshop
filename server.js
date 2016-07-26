var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'magiky13', 
  password : '',
  database: 'reddit'
});


var reddit = require('./reddit.js');
var redditAPI = reddit(connection);

app.get('/hello', function(req, res) {
    res.send('<h1>Archichic</h1>');
});


app.get('/hello', function(req, res) {
    var input = req.query.name; // query says take the object after
    res.send(`<h1>Hey ${input}</h1>`);
});

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


app.get('/posts', function(req, res){
     var num = parseInt(req.query.id);
     redditAPI.getFivePost(num, {}, function(err, posts){
      function createLi(post){
         return `
         <li>
          <p>
             ${post.title}
          </p>
         </li>
         <ul><li>
          <p>
             ${post.url}
          </p>
         </li></ul>
         `;}
    
    console.log(posts);
         var html = `
         <div id="contents">
         <h1>List of contents</h1>
         <ul class="contents-list">
          ${posts.map(function(post){
             return createLi(post);
          }).join("")}
         </ul>
         </div>`;
         res.send(html);
    });
});


app.get('/createContent', function(req, res) {
    
    var htmlForm =
   
    `<form action="/createContent" method="POST"> 
        
        <div>
            <input type="text" name="url" placeholder="Enter a URL to content">
        
        </div>
        
        <div>
            <input type="text" name="title" placeholder="Enter the title of your content">
        
        </div>
        
            <button type="submit">Create!</button>
            
        </form>`;
        
    res.send(htmlForm);
    
});

app.post('/createContent', function (req, res) {
    console.log(req.body);
    redditAPI.createPost( {
        title: req.body.title,
        url : req.body.url,
        userId: 1
    }, 
    function(err, post){
        res.send(post);
    });
});









//secret stuff

var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
