let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');
let config = require('./config');
let port = config.expressPort;

mongoose.Promise = require('bluebird');
mongoose.connect(config.mongoURL);

let rideRouter = require('./src/routes/rideRouter');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/rides', rideRouter);

app.listen(port, function(){
    console.log('Server is running on Port: ', port);
});
