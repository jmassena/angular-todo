// routes.api.todos.js

var express = require('express');
var router = express.Router();
var path = require('path');


var Todo = require('./../../data/todo.js');

router.get('/todos', function(req, res, next) {
  'use strict';

  Todo.find(function(err, data){
    if(err){
      next(err);
    }
    else{
      res.json(data);
    }
  });
});

module.exports = router;
