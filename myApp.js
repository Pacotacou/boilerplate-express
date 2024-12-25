let express = require('express');
let bodyParser = require('body-parser');
require('dotenv').config();

let app = express();

console.log("Hello World")

app.use(function middleware(req, res, next) {
    var string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);
    next();
});

app.use(express.static(__dirname + "/public"));
app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req, res)=>{
    let absolutePath = __dirname + '/views/index.html'
    res.sendFile(absolutePath)
});

app.get('/now',function (req, res, next) {
    req.time = new Date().toString();
    next()
}, function (req, res){
    res.json({"time": req.time})
});

app.get('/json',(req, res)=>{
    let message = "Hello json";
    if (process.env.MESSAGE_STYLE == 'uppercase') {
        message = "HELLO JSON";
    } else{
        message = "Hello json";
    }
    res.json({"message": message});
});

app.get('/:word/echo',function(req,res){
    res.json({"echo": req.params.word});
});

app.route('/name')
.get(function(req,res) { 
    let { first:  firstName , last : lastName} = req.query;
    res.json({"name": `${firstName} ${lastName}`})
})
.post(function(req,res){
    let string = `${req.body.first} ${req.body.last}`;
    res.json({name: string});
});




































 module.exports = app;
