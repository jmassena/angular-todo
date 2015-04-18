var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// mongo connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todos');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  'use strict';
  console.log('Connected to MongoDB');
});


var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

// routes setup
require('./routes/routes.js')(app);

console.log('** DEV **');
app.use('/', express.static('./src/client'));
app.use('/', express.static('./'));


// var port = process.env.PORT || 3000;
// var environment = process.env.NODE_ENV;
//
// console.log('About to crank up node');
// console.log('PORT=' + port);
// console.log('NODE_ENV=' + environment);
//
//
// app.get('/ping', function(req, res, next) {
//     console.log(req.body);
//     res.send('pong');
// });
//
// console.log('** DEV **');
// app.use('/', express.static('./src/client'));
// app.use('/', express.static('./'));
//
// app.listen(port, function() {
//     console.log('Express server listening on port ' + port);
//     console.log('env = ' + app.get('env') +
//         '\n__dirname = ' + __dirname  +
//         '\nprocess.cwd = ' + process.cwd());
// });


module.exports = app;
