var express = require('express');
var path = require('path')
var port = process.env.port || 3000;
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = require('./server/router/route');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/www',express.static(__dirname+ '/www'));
app.use('/templates', express.static(__dirname + '/www/templates'));
app.use('/api', router);


app.get("/", function(req,res){
	res.sendFile(path.join(__dirname + '/www/index.html'));
});

//getting started

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console,'console error:'));
db.once('open', function(){
	console.log('Connected');
})
app.listen(port);
console.log('Starting....');
console.log('Visit at localhost:'+ port);
