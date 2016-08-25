
const Kafka = require("kafka-node");

// Creating connection to kafka broker
const producer = new Kafka.Producer(new Kafka.Client("localhost:2181"), { requireAcks: 1 });
const topic = "topic1";
const partition = 0;
const attributes = 0;

const event = {
    batata: 1,
    laranja: 2,
};

producer.on("ready", () => {
    const message = {
        topic,
        partition,
        messages: JSON.stringify(event),
        attributes,
    };

    producer.send(
        [message], (err, result) => {
            console.log(err || result);
            process.exit();
        }
    );
});

producer.on("error", (err) => {
    console.log("error", err);
});
