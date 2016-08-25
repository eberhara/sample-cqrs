
const restify = require("restify");

const producer = require("./producer");
const server = restify.createServer({
    name: "kafka-producer",
    version: "1.0.0"
});

/* Define all server routes */
server.get('/', (req, res) => {
    res.send(200, "Service is up and running");
    return next();
});
server.post('/', (req, res) => {
    producer.publish({batata : 1}, (err, result) => {
        res.send(200, 'saved');
        return next();
    });
});

/* Starts webserver */
server.listen("8081", "127.0.0.1", () => {
    console.log("Server listening on 8081");
});
module.exports = server;
