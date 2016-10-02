const MongoClient = require('./db/mongo-client');
const Kafka = require("kafka-node");
const kafkaAddress = process.env.NODE_ENV === 'production' ?
    "kafka:2181" :
    "localhost:2181";

const client = new Kafka.Client(kafkaAddress);
const topics = [{ topic: "todos", partition: 0 }];
const options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

const consumer = new Kafka.Consumer(client, topics, options);
const offset = new Kafka.Offset(client);

consumer.on("message", (message) => {
    const todo = JSON.parse(message.value);

    MongoClient((db) => {
        db.collection('todos').findOneAndUpdate(
            { id: todo.id }, 
            { $set: { id: todo.id, text: todo.text }}, 
            { returnOriginal: false, upsert: true}, 
            err => console.log(err || `Updated todo ${todo.id}`)
        )
    });
});

consumer.on("error", (err) => {
    console.log("error", err);
});

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
