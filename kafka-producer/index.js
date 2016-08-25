
const restify = require('restify');

const server = restify.createServer({
    name: "kafka-producer",
    version: "1.0.0"
});

//server.post('/produce', null);
server.get('/status', (req, res) => {
    res.send(200, 'ok');
});

server.listen("8081", "127.0.0.1", () => {
    console.log("Server listening on 8081");
});

module.exports = server;
