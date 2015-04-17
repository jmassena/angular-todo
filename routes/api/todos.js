// routes.api.todos.js

var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');

var UserEvents = require('./../../data/user-events.js');
var Todo = mongoose.model('Todo');

router.get('/users/:userId/todos', function(req, res, next) {
  'use strict';

  var userId = req.params.userId;
  getUserEvents(userId, req, res);

  // UserEvents.where({ userId: userId })
  // .findOne(function(err, data){
  //   if(err){
  //     res.json({error: err});
  //   }
  //   else{
  //     res.json(data);
  //   }
  // });

});

function getUserEvents(userId, req, res){
  'use strict';

  UserEvents.where({ userId: userId })
  .findOne(function(err, data){
    if(err){
      res.json({error: err});
    }
    else{
      res.json(data);
    }
  });
}


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

router.delete('/users/:userId/todos/:todoId', function (req, res, next){
  'use strict';

  var userId = req.params.userId;
  var todoId = req.params.todoId;

  // UserEvents.findOneAndUpdate(
  //   {userId: userId},
  //   {$pull: {todos: {_id: todoId}}},
  //   function(err, updatedDoc){
  //     if(err){
  //       res.json({error: err});
  //     }
  //     else{
  //       getUserEvents(userId, req, res);
  //
  //       // // this will tell caller if item was removed
  //       // // but caller will need a second call to get current data (if they want it, or i could just do it here...)
  //       // //res.json(updatedDoc);
  //       // UserEvents.where({ userId: userId })
  //       // .findOne(function(err, data){
  //       //   if(err){
  //       //     res.json({error: err});
  //       //   }
  //       //   else{
  //       //     res.json(data);
  //       //   }
  //       // });
  //     }
  //   }
  // );

  UserEvents.where({userId: userId})
  .findOne(function(err, data){
    if(err){
      res.json({error: err});
    }
    else{

      if(!data){
        res.json({message: 'Update failed. No data for user: ' + userId});
      }
      else{
        // find item to update
        var found = false;

        // console.log('search id: ' + todoId);
        for(var i = 0; i < data.todos.length; i++){

          // console.log('_id: ' + data.todos[i]._id);
          if(data.todos[i]._id.equals(todoId)){
            found = true;
            data.todos.splice(i,1);
            break;
          }
        }

        if(found){
          data.save(function(err, data){
            if(err){
              res.json({error: err});
            }
            else{
              res.json(data);
            }
          });
        }
        else{
          res.json({message: 'Update failed. No item found with input id.'});
        }
      }

    }
  });
});



router.put('/users/:userId/todos/:todoId', function (req, res, next){
  'use strict';

  var userId = req.params.userId;
  var todoId = req.params.todoId;
  var todo = new Todo(req.body);

  // UserEvents.findOneAndUpdate(
  //   {userId: userId, 'todos._id': todoId},
  //   {$set: {'todos.$': todo}},
  //   function(err, updatedDoc){
  //     if(err){
  //       res.json({error: err});
  //     }
  //     else{
  //       getUserEvents(userId, req, res);
  //
  //       // // this will tell caller if item was removed
  //       // // but caller will need a second call to get current data (if they want it, or i could just do it here...)
  //       // //res.json(updatedDoc);
  //       // UserEvents.where({ userId: userId })
  //       // .findOne(function(err, data){
  //       //   if(err){
  //       //     res.json({error: err});
  //       //   }
  //       //   else{
  //       //     res.json(data);
  //       //   }
  //       // });
  //     }
  //   }
  // );

  UserEvents.where({userId: userId})
  .findOne(function(err, data){
    if(err){
      res.json({error: err});
    }
    else{

      if(!data){
        res.json({message: 'Update failed. No data for user: ' + userId});
      }
      else{
        // find item to update
        var found = false;

        // console.log('search id: ' + todoId);
        for(var i = 0; i < data.todos.length; i++){

          if(data.todos[i]._id.equals(todoId)){
            data.todos[i] = todo;
            found = true;
          }
        }

        if(found){
          data.save(function(err, data){
            if(err){
              res.json({error: err});
            }
            else{
              res.json(data);
            }
          });
        }
        else{
          res.json({message: 'Update failed. No item found with input id.'});
        }
      }

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
