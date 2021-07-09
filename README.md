# newsletter-app

This is an example of using RabbitMQ ([amqplib](http://www.squaremobius.net/amqp.node/)) for queueing [Nodemailer](https://nodemailer.com/) email messages. This allows you to push messages from your application quickly to delivery queue and let Nodemailer handle the actual sending asynchronously from a background process.

## Setup

Download files from Github

```
$ git clone https://github.com/jveyccan/newsletter-app.git
$ cd newsletter-app
```

Install required dependencies

```
$ npm install 
```

In this project, [cloudamqp](https://snake.rmq2.cloudamqp.com/) is used.
If local RabbitMQ is preferred, make sure that you have a RabbitMQ server running (default config assumes RabbitMQ running on localhost with default credentials) and also check the configuration options in [configurations](./configuration).

### Running

```
$ npm start
```
An example csv file is also attached for test purposes.