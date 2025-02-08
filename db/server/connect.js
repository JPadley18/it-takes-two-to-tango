require('dotenv').config();
const amqp = require('amqlib');
const mongoose = require('mongoose');

async function connectMongoDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
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
    content: String,
    receiveAt: { type: Date, default: Date.now }
});
const DM = mongoose.model("Schema", Schema);


// RabbitMQ
async function Messages() {
    
}