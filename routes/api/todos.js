// routes.api.todos.js

var express = require('express');
var router = express.Router();
var path = require('path');


var Todo = require('./../../data/todo.js');

router.get('/todos', function(req, res, next) {
  'use strict';

  Todo.find(function(err, data){
    if(err){
      res.json({error: err});
    }
    else{
      res.json(data);
    }
  });
});


router.post('/todos', function(req, res, next) {
  'use strict';

  //console.log('posting body /todo: ' + JSON.stringify(req));

  //console.log('posting body /todo: ' + JSON.stringify(req.body));

  
  var todo = new Todo(req.body);

  //console.log('posting /todo: ' + JSON.stringify(todo));

  todo.save(function(err, data){
    if(err){
      res.json({error: err});
    }
    else{
      res.json(data);
    }
  });
});

module.exports = router;
