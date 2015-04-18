// routes.api.todos.js

var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');

// var UserEvents = require('./../../data/user-events.js');
var Todo = require('./../../data/todo.js');


// GET
router.get('/users/:userId/todos', function(req, res, next) {
  'use strict';

  var userId = req.params.userId;
  Todo.find({ userId: userId }, function(err, data){
    if(err){
      res.json({state: 'error', message: err});
    }
    else{
      res.json(data);
    }
  });
});


// POST
router.post('/users/:userId/todos', function(req, res, next) {
  'use strict';

  var userId = req.params.userId;

  if(!req.body){
    res.json({state: 'error', message: 'body must contain a todo object json'});
    return;
  }
  // make sure this doesn't exist already. cannot have an _id
  if(req.body._id){
    res.json({state: 'error', message: 'new todo object _id must be null. _id: ' + req.body._id});
    return;
  }

  var todo = new Todo(req.body);
  todo.userId = userId; // just to be sure user isn't trying to create todo for someone else

  todo.save(function(err, data){
    if(err){
      res.json({state: 'error', message: err});
    }
    else{
      res.json(data);
    }
  });
});

// DELETE
router.delete('/users/:userId/todos/:todoId', function (req, res, next){
  'use strict';

  var userId = req.params.userId; // not used but should be
  var todoId = req.params.todoId;

  Todo.findOneAndRemove({_id: todoId, userId: userId}, function(err, data){

    console.log('deleting');
    if(err){
      res.json({state: 'error', message: err});
    }
    else{
      res.json(data);
    }
  });
});


// PUT
router.put('/users/:userId/todos/:todoId', function (req, res, next){
  'use strict';

  var userId = Number(req.params.userId);
  var todoId = req.params.todoId;
  //var todo = new Todo(req.body);
  var todo = req.body;

  if(!todo.userId){
    res.json({state: 'error',
      message: 'userId of object is not defined or is null'});
    return;
  }

  if(Number(todo.userId) !== userId){
    res.json({state: 'error',
      message: 'userId of object does not match userId in path. object userId: ' +
                todo.userId + ' path userId: ' + userId + ' ' +
                'obj type: ' + typeof(todo.userId) + ' userId type: ' + typeof(userId)});
    return;
  }

  // validate
  if(!todo._id || String(todo._id) !== String(todoId)){
    res.json({state: 'error',
      message: 'id of object does not match id in path. object _id: ' + todo._id + ' path id: ' + todoId});
    return;
  }

  Todo.findOne({_id: todoId, userId: req.params.userId}, function(err, dbTodo){

    if(err){
      res.json({state: 'error', message: err});
    }
    else{
      if(!dbTodo){
        res.json({state: 'error', message: 'todo not found with id ' + todoId + ' for user ' + userId});
      }
      else{
        copyFields(todo, dbTodo);
        dbTodo.save(function(err, data){
          if(err){
            res.json({state: 'error', message: err});
          }
          else{
            res.json(data);
          }
        });
      }
    }
  });
});

function copyFields(source, target){
  'use strict';

  for(var prop in source){
    if(prop !== '_id' && prop !== '__v' && source.hasOwnProperty(prop)){
      target[prop] = source[prop];
    }
  }
}


module.exports = router;
