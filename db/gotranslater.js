var amqp = require('amqplib/callback_api');
const { insertUser, openDB } = require('./dbUtils');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
      throw error0;
    }
    openDB();
    
    connection.createChannel(function(error1, channel) {
        if (error1) {
          throw error1;
        }

    
        channel.assertQueue("REGISTER_USER", {
          durable: false
        });
        channel.assertQueue("LOGIN_USER", {
          durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C");

        channel.consume("REGISTER_USER", async function(msg) {
            const jsonData = JSON.parse(msg.content.toString());
            const data = await insertUser(jsonData);

        }, {
            noAck: true
        });

        channel.consume("LOGIN_USER", function(msg){
            console.log('Login request: '+msg.content.toString());
        }, {
          noAck: true
        })

    });

});