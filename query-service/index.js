
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

server.get('/todos/:id', (req, res, next) => {
    console.log(`Received new todo: ${todo.text}`);

    MongoClient((db) =>{
        db.collection('todos').insertOne(todo, (err) => {
            db.close();

            if(err){
                res.send(503, 'ERROR');
                return next();
            }else{
                producer.publish(todo, (err, result) => {
                    res.send(200);
                    return next();
                });
            }
        });
    });
});

/* Starts webserver */
server.listen("3100", () => {
    console.log("Server listening on 3100");
});
module.exports = server;
