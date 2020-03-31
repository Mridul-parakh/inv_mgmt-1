var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var autoIncrement = require('mongoose-auto-increment');

let db_connection = process.env.NODE_ENV === 'PRODUCTION'
    ? 'mongodb+srv://sudo_mi_labs:jGqLSJsKKofrZxg7@internal-workflow-cmuar.mongodb.net/iw'
    : process.env.NODE_ENV === 'TEST' ? 'mongodb://10.11.12.4:27017/iw' : 'mongodb://localhost:27017/iw'

let db_string = process.env.NODE_ENV ? process.env.NODE_ENV : 'local'
mongoose = mongoose.createConnection(db_connection, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
}, function (err) {
    if (!err)
        console.log('=============== IW: Database Connected to ' + db_string + ' ===============');
    else
        console.log(err);
});

autoIncrement.initialize(mongoose);
module.exports = mongoose;