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
  // Todo.get({ userId: userId }, onError(res), onSuccess(res));

  Todo.get({ userId: userId })
  .then(onSuccess(res), onError(res));

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

  //Todo.add(userId, req.body, onError(res), onSuccess(res));
  Todo.add(userId, req.body)
  .then(onSuccess(res), onError(res));

});


// DELETE
router.delete('/users/:userId/todos/:todoId', function (req, res, next){
  'use strict';

  var userId = req.params.userId; // not used but should be
  var todoId = req.params.todoId;

  //Todo.deleteById(userId, todoId, onError(res), onSuccess(res));
  Todo.deleteById(userId, todoId)
  .then(onSuccess(res), onError(res));

});


// PUT
router.put('/users/:userId/todos/:todoId', function (req, res, next){
  'use strict';

  var userId = Number(req.params.userId);
  var todoId = req.params.todoId;
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

  // Todo.update(todo, onError(res), onSuccess(res));
  Todo.update(todo)
  .then(onSuccess(res), onError(res));

});


function onSuccess(res){
  'use strict';
  return function(data){
    console.log('success');
    res.json(data);
  };
}
function onError(res){
  'use strict';
  return function(err){
    console.log('failure: ' + err);

    res.json({state: 'error', message: '' + err});
  };
}

module.exports = router;
