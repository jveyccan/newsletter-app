
const amqplib = require('amqplib/callback_api');
const config = require('./configuration');

// Create connection to AMQP server
exports.sendrmq = async function (data, userData){
    console.log(config.amqp);
const connection = await amqplib.connect(config.amqp, (err, connection) => {
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

            let sender = (content, next) => {
                let sent = channel.sendToQueue(config.queue, Buffer.from(JSON.stringify(content)), {
                    persistent: true,
                    contentType: 'application/json'
                });
                if (sent) {
                    return next();
                } else {
                    channel.once('drain', () => next());
                }
            };

            // push 100 messages to queue
            let sent = 0, i=0, firstname = "", lastname="";
            let sendNext = () => {
                if (i == data.length-1) {
                    console.log('All messages sent!');
                    // Close connection to AMQP server

                    return channel.close(() => connection.close());
                }
                sent++;
                i++;
                firstname = userData[data[i].email]._doc?userData[data[i].email]._doc.firstname:" ";
                lastname = userData[data[i].email]._doc?userData[data[i].email]._doc.lastname:" ";
                sender({
                    to: data[i].email,
                    subject: data[i].name,
                    text: "Hi, " +userData[data[i].email].firstname + " "+userData[data[i].email].lastname,
                    html: data[i].content
                }, sendNext);
            };

            sendNext();

        });
    });
});
console.log(connection);
}
