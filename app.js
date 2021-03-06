const express = global.express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongoose = global.mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const jwt = global.jwt = require("jsonwebtoken");
const uuid = global.uuid = require('node-uuid');
const secret = global.secret = "3adb67c3-d862-450d-9f3f-24b65a081220";
const bcrypt = global.bcrypt = require('bcrypt-nodejs');

const viewRoutes = require('./routes/views');
const apiRoutes = require('./routes/api');

// db config
const dbConfig = {
    host: "localhost",
    db: 'bug_tracker',
    port: 27017
};

mongoose.connect('mongodb://localhost/debugger', function (err) {
    if (err)
        console.log("Failed to establish a connection to Mongo DB");
    else {
        console.log("Connection established to Mongo DB");
    }
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

const _middleware = require('./middlewares/middleware');

// routes
app.use('/api', _middleware.api_middleware, expressJWT({secret: secret}).unless({path: ['/api/report', '/api/user/login', '/api/user/register']}), apiRoutes);
app.all('*', viewRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.listen(8100, function (err) {
    if (err) console.error(err);
    else console.log("Server running on port #3000");
});

module.exports = app;
