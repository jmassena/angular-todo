// routes.api.todos.js

var express = require('express');
var router = express.Router();
var path = require('path');


var UserEvents = require('./../../data/user-events.js');

router.get('/users/:userId/todos', function(req, res, next) {
  'use strict';

  var userId = req.params.userId;

  UserEvents.where({ userId: userId })
  .findOne(function(err, data){
    if(err){
      res.json({error: err});
    }
    else{
      res.json(data);
    }
  });

});


router.post('/users/:userId/todos', function(req, res, next) {
  'use strict';

  var userId = req.params.userId;

  if(!req.body){
    res.json({error:'body must contain a todo object json'});
  }

  var todo = req.body;

  console.log('body: ' + JSON.stringify(todo));

  UserEvents.where({ userId: userId })
  .findOne(function(err, data){
    if(err){
      res.json({error: err});
    }
    else{

      console.log('data: ' + JSON.stringify(data));
      if(!data){
        // create new document
        data = new UserEvents({userId: userId, todos: [todo]});
      }
      else{
        // // clean up
        // if(data.todos[0] == null){
        //   data.todos.shift();
        // }
        data.todos.push(todo);
      }

      data.save(function(err, data){
        if(err){
          res.json({error: err});
        }
        else{
          res.json(data);
        }
      });
    }
  });
});

// function findTodosByuserId(userId, onError, onData){
//   UserEvents.find({userId: userId}, function(err, data){
//     if(err){
//       onError(err);
//     }
//     else{
//       onData(data);
//     }
//   });
// }
//
// findTodosByuserId(req.params.userId,
//   function(err){
//     res.json({error:err});
//   },
//   function(data){
//     res.json(data);
//   }
// );

module.exports = router;
