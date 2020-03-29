require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();
const HttpResponse = require('./src/middlewares/HttpResponse')
const authRoute = require('./src/routes/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);

// Add headers
app.use(logger('dev'));
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token");

    // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome to RNStoriesMVP API');
})

// Routes
app.use('/auth', authRoute);

// Http Responses Middleware
app.use(HttpResponse);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.json({ success: false, message: 'Route not found' });
});

app.listen(process.env.PORT || app.get('port'), () => {
    console.log(`RNStoriesMVP API listening on port ${process.env.PORT}!`)
})