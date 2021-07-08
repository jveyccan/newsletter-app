const path = require('path');
const express = require('express');

const { mongoDbUrl, PORT, HOST, PROTOCOL} = require('./configuration');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const http = require("http");

// for parsing application/json
app.use(express.json());

app.use((err, req, res, next) => {
    // This check makes sure this is a JSON parsing issue, but it might be
    // coming from any middleware, not just body-parser:
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            success: false,
            message: "Invalid json data",
        });
    }

    next();
});


// for parsing application/xwww-
app.use(express.urlencoded({
    extended: true
  }));//form-urlencoded

// for parsing multipart/form-data
app.use(express.static('public'));
// app.use('/public', express.static('public'));
app.use(express.json());


app.use(cors());

app.use(express.static(__dirname + '/public'));
//Routes
var apiRoutes = require("./routes/users");



mongoose.connect(mongoDbUrl, { useNewUrlParser: true, poolSize: 350, autoIndex: false, useUnifiedTopology: true })
    .then(() => console.log("data base has been connected"))
    .catch(e => 
        {    logger.log(e);
            console.log(e);
        });

var db = mongoose.connection;


if (!db) {
    console.log("Error connecting db")
}
else {
    console.log("Db connected successfully")
}

app.get('/', (req, res) => {
    res.send('Newsletter Server')
});

app.use('/api', apiRoutes);


app.listen(PORT, function () {
    console.log("Running Newsletter project on port " + PROTOCOL + '://' + HOST + ':' + PORT);
});
