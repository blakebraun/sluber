var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var port = 4200;

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://127.0.0.1:27017/sluber');

var itemRouter = require('./src/routes/itemRouter');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/items', itemRouter);

app.listen(port, function(){
    console.log('Server is running on Port: ', port);
});
