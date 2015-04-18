
module.exports =  (function(){
  'use strict';

  var mongoose = require('mongoose');
  var mongooseUtils = require('./mongooseUtils.js');

  var TodoSchema = new mongoose.Schema({
      userId: {
        type: Number,
        index: {unique: false},
        required: '{PATH} is required'
      },
      status: {
        type: String,
        enum: ['not-started', 'started', 'completed'],
        default: 'not-started'
      },
      title: {
        type: String,
        required: '{PATH} is required',
        min: 3,
        max: 50
      },
      notes: {
        type: String,
        max: 250
      },
      dueDateTime: {
        type: Date
      },
      createdDateTime: {
        type: Date,
        default: Date.now,
        required: '{PATH} is required'
      }
  });


  var TodoModel = mongoose.model('Todo', TodoSchema);

  function resultsHandle(err, data, onError, onSuccess){
    if(err){
      onError(err);
    }
    else{
      onSuccess(data);
    }
  }

  function get(condition, onError, onSuccess){

    TodoModel.find(condition, function(err, data){
      resultsHandle(err, data, onError, onSuccess);
    });
  }

  function add(userId, todo, onError, onSuccess){

    todo._id = null;
    todo.userId = userId;

    var newTodo = new TodoModel(todo);

    newTodo.save(function(err, data){
      resultsHandle(err, data, onError, onSuccess);
    });
  }

  function deleteById(userId, todoId, onError, onSuccess){

    TodoModel.findOneAndRemove({_id: todoId, userId: userId}, function(err, data){
      resultsHandle(err, data, onError, onSuccess);
    });
  }

  function update(todo, onError, onSuccess){

    var error;

    if(!todo._id || !todo.userId){
      error = new Error();
      error.message = 'update operation requires todo object to have _id and userId';
      error.statusCode = 400; // bad request
      onError(error);
      return;
    }

    TodoModel.findOne({_id: todo._id, userId: todo.userId}, function(err, dbTodo){

      if(err){
        onError(err);
        return;
      }

      if(!dbTodo){
        error = new Error();
        error.message =  'Todo not found with id ' + todo._id + ' for user ' + todo.userId;
        error.statusCode = 404; // not found
        onError(error);
        return;
      }

      mongooseUtils.copyFieldsToModel(todo, dbTodo);
      dbTodo.save(function(err, data){
        resultsHandle(err, data, onError, onSuccess);
      });
    });
  }

  return {
    Model: TodoModel,
    add: add,
    get: get,
    deleteById: deleteById,
    update: update

  };
}());
