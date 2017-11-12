var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Item = new Schema({
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
    pickup:{
        type: String
    },
    dropoff:{
        type: String
    }
},{
    collection: 'items'
});

module.exports = mongoose.model('Item', Item);
