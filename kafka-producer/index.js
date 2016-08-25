
const kafka = require("kafka-node");

const producer = new kafka.Producer(new kafka.Client("localhost:2181"), { requireAcks: 1 });
const topic = "topic1";

producer.on("ready", () => {
    const message = "a message";
    const keyedMessage = new kafka.KeyedMessage("keyed", "a keyed message");

    const event = {
        topic,
        partition: 0,
        messages: [message, keyedMessage],
        attributes: 0,
    };

    producer.send(
        [event]
        , (err, result) => {
            console.log(err || result);
            process.exit();
        }
    );
});

producer.on("error", (err) => {
    console.log("error", err);
});
