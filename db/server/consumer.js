require('dotenv').config();
const amqp = require('amqlib');
const mongoose = require('mongoose');

async function connectMongoDB() {
    try {
        await mongoose.connect(import.meta.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(" Connected to MongoDB Cluster");
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    }
}

const DMSchema = new mongoose.Schema({

    user_id: Int,
    username: String,
    password: String,
    wins: Int,
    loss: Int,

    receiveAt: { type: Date, default: Date.now }
});
const DM = mongoose.model("Schema", DMSchema);


// RabbitMQ
async function Messages() {
    try {
        const connection = await amqp.connect(import.meta.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        
        await channel.assertQueue(import.meta.env.QUEUE_NAME, { durable: false });
        console.log(" Waiting for messages in queue: ${import.meta.env.QUEUE_NAME}");

        channel.consume(import.meta.env.QUEUE_NAME, async (msg) => {
            if (msg !== null) {
                const messageContent = msg.content.toString();
                console.log("Received: ", messageContent);

                try {
                    await DM.create({ content: messageContent });
                    console.log("Message stored in MongoDB");
                } catch (dbErr) {
                    console.error("Error saving to MongoDB:", dbErr);
                }

                channel.ack(msg);
            }
        });
    } catch (err) {
        console.error("RabbitMQ Error: ", err)
        process.exit(1);
    }
}

(async () => {
    await connectMongoDB();
    await Messages();
})();