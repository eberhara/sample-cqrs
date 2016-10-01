const MongoClient = require('mongodb').MongoClient;
const url = process.env.NODE_ENV === 'production' ?
    'mongodb://mongo-command:27017/todos' : 
    'mongodb://localhost:27017/todos';

module.exports = (cb) => MongoClient.connect(url, (err, db) => {
    if (err) {
        console.err(err);
    } else {
        cb(db);
    }
});
