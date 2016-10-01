const Kafka = require("kafka-node");

/* Kafka connection parameters */
const topic = "topic1";
const partition = 0;
const attributes = 0;
const requireAcks = 1;

const kafkaAddress = process.env.NODE_ENV === 'production' ?
	"kafka:2181" :
	"localhost:2181";

console.log(kafkaAddress);

/* Connects to kafka broker */
const producer = new Kafka.Producer(new Kafka.Client(kafkaAddress), { requireAcks });

producer.on("ready", (err) => {
    console.log(err || "Connected to kafka");
});

producer.on("error", (err) => {
    console.log("error", err);
});

/* Event Pubisher */
const publish = (event, cb) => {
    const message = {
        topic,
        partition,
        messages: JSON.stringify(event),
        attributes,
    };

    producer.send([message], cb);
};

module.exports = producer;
module.exports.publish = publish;
