import {EachMessagePayload, Kafka} from "kafkajs";
const kafka = new Kafka({
    clientId: 'email-consumer',
    brokers: ['pkc-12576z.us-west2.gcp.confluent.cloud:9092'],
    ssl: true,
    sasl: {
        mechanism: 'plain',
        username: 'JUW6KVQ25QBLERXX',
        password: '9ZBNmtTJzKPWZZu7ADNYqNBKPnjCZn8GEBdDgE+/o0fWbrPlNwWzI9OMezsukDF1'
    }
});

export = kafka.producer();