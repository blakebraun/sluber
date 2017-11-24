let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');
let port = 4200;

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://127.0.0.1:27017/sluber');

let rideRouter = require('./src/routes/itemRouter');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/rides', rideRouter);

app.listen(port, function(){
    console.log('Server is running on Port: ', port);
});
