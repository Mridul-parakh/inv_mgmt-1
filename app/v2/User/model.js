var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var db            = require('../../../config/db');

var user_schema = new Schema({},
    {
        timestamps : true,
        strict     : false
    });

    module.exports = db.model('user', user_schema);