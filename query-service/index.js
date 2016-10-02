
const restify = require("restify");
const MongoClient = require('./db/mongo-client');

const server = restify.createServer({
    name: "command-query",
    version: "1.0.0"
});

server.use(restify.CORS());
server.use(restify.queryParser());

/* Define all server routes */
server.get('/', (req, res, next) => {
    res.send(200, "Service is up and running");
    return next();
});

server.get('/todos', (req, res, next) => {
    MongoClient((db) => {
        db.collection('todos').find({}).toArray(function(err, docs) {
            db.close();
            if(err){
                res.send(503, 'ERROR');
                return next();
            }else{
                const todos = docs.map((d) => { return { id: d.id, text: d.text };});
                res.send(200, todos);
            }
        });
    });
});

/* Starts webserver */
server.listen("3100", () => {
    console.log("Server listening on 3100");
});
module.exports = server;
