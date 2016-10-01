const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/todos';

module.exports = (cb) => MongoClient.connect(url, (err, db) => {
    if (err) {
        console.err(err);
    } else {
        cb(db);
    }
});
