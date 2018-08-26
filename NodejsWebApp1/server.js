var port = process.env.PORT || 1337;

var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + '/'));
app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port);  
