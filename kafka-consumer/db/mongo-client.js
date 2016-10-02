const MongoClient = require('mongodb').MongoClient;
const url = process.env.NODE_ENV === 'production' ?
    'mongodb://mongo-query:27017/todos' : 
    'mongodb://localhost:27018/todos';

module.exports = (cb) => MongoClient.connect(url, (err, db) => {
    if (err) {
        console.log(err);
    } else {
        cb(db);
    }
});
