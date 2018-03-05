let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Ride = new Schema({
    name: {
        type: String
    },
    banner:{
        type: String
    },
    phone:{
        type: String
    },
    email:{
        type: String
    },
    riders:{
        type: String
    },
    pickup:{
        type: String
    },
    dropoff:{
        type: String
    },
    received:{
        type: Date
    },
    dispatched:{
        type: String
    },
    advice:{
        type: String
    }
},{
    collection: 'rides'
});

module.exports = mongoose.model('Ride', Ride);
