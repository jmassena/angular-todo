var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// // mongo connection
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/todoang');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error: '));
// db.once('open', function(){
//   'use strict';
//   console.log('Connected to MongoDB');
// });

//var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();


// view engine setup
// app.set('views', path.join(__dirname, '/public/modules/home/views'));
// app.set('view engine', 'ejs');
//
// app.engine('html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/api', routes);
//routes = require('./routes/index')(app);

// app.use('/users', users);
// routes setup
require('./routes/routes.js')(app);
//app.use('/', require('./routes/ui/index.js'));



module.exports = app;
