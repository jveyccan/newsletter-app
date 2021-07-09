const config = require('./configuration');
const amqplib = require('amqplib/callback_api');
const nodemailer = require('nodemailer');

// Setup Nodemailer transport
const transport = nodemailer.createTransport({
    host: "127.0.0.1",
    port: 12345,
    disableFileAccess: true,
    disableUrlAccess: true
}, {
    from: 'sender@mailinator.com'
});

// Create connection to AMQP server
amqplib.connect(config.amqp, (err, connection) => {
    if (err) {
        console.error(err.stack);
        return process.exit(1);
    }
    // Create channel
    connection.createChannel((err, channel) => {
        if (err) {
            console.error(err.stack);
            return process.exit(1);
        }

        channel.assertQueue(config.queue, {
            durable: true
        }, err => {
            if (err) {
                console.error(err.stack);
                return process.exit(1);
            }

      
            channel.prefetch(1);

            channel.consume(config.queue, data => {
                if (data === null) {
                    return;
                }

                let message = JSON.parse(data.content.toString());

                
                message.auth = {
                    user: 'testuser',
                    pass: 'testpass'
                };

                transport.sendMail(message, (err, info) => {
                    if (err) {
                        console.error(err.stack);
                        return channel.nack(data);
                    }
                    console.log('Delivered message %s', info.messageId);
                    channel.ack(data);
                });
            });
        });
    });
});
