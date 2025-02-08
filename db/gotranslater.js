var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
      throw error0;
    }
    
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

        channel.consume("REGISTER_USER", function(msg) {
            console.log("Register request: "+ msg.content.toString());
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