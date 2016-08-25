const Kafka = require("kafka-node");

const client = new Kafka.Client("localhost:2181");
const topics = [{ topic: "topic1", partition: 0 }];
const options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

const consumer = new Kafka.Consumer(client, topics, options);
const offset = new Kafka.Offset(client);

consumer.on("message", (message) => {
    console.log(message);
});

consumer.on("error", (err) => {
    console.log("error", err);
});

/*
* If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
*/
consumer.on("offsetOutOfRange", (t) => {
    const topic = t;
    topic.maxNum = 2;

    offset.fetch([topic], (err, offsets) => {
        if (err) {
            console.error(err);
        }

        const min = Math.min(offsets[topic.topic][topic.partition]);
        consumer.setOffset(topic.topic, topic.partition, min);
    });
});
