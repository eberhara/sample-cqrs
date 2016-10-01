
const restify = require("restify");
const producer = require("./producer");
const MongoClient = require('./db/mongo-client');
const uuid = require('node-uuid');

const server = restify.createServer({
    name: "command-service",
    version: "1.0.0"
});

server.use(restify.CORS());
server.use(restify.bodyParser());

/* Define all server routes */
server.get('/', (req, res, next) => {
    res.send(200, "Service is up and running");
    return next();
});

server.post('/todos', (req, res, next) => {
	const todo = {};
    const body = JSON.parse(req.body);

	todo.id = uuid.v4();
    todo.text = body.text;

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
server.listen("3000", () => {
    console.log("Server listening on 3000");
});
module.exports = server;
