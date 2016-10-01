
const restify = require("restify");
const producer = require("./producer");

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

server.post('/', (req, res, next) => {
	const body = JSON.parse(req.body);
	console.log(`Received new todo: ${body.todo}`);
    
    producer.publish(body, (err, result) => {
        res.send(200);
        return next();
    });
});

/* Starts webserver */
server.listen("3000", "127.0.0.1", () => {
    console.log("Server listening on 3000");
});
module.exports = server;
