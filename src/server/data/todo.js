
module.exports =  (function(){
  'use strict';

  var mongoose = require('mongoose');
  var mongooseUtils = require('../common/mongooseUtils.js');
  // var mpromise = reuqire('mpromise');

  // unit tests use this require multiple times so can have this model already defined
  // which gives an error
  var TodoModel;

  if (mongoose.models.Todo) {

    // console.log('Using existing todo model');
    TodoModel = mongoose.model('Todo');
  }
  else {

    // console.log('Creating new todo model');
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

    TodoModel = mongoose.model('Todo', TodoSchema);
  }

  function get(condition){

    // console.log('getting with condition: ' + JSON.stringify(condition));

    return TodoModel.find(condition).exec();

  }

  function getByUserId(userId){

    return get({userId: userId});
  }

  function add(userId, todo){
    todo._id = null;
    todo.userId = userId;
    // console.log('adding todo for user: ' + todo.userId);

    var newTodo = new TodoModel(todo);

    return newTodo.save();
  }

  function deleteById(userId, todoId){

    return TodoModel.findOneAndRemove({_id: todoId, userId: userId}).exec()
      .then(function(data){
        // console.log('delete attempted');

        if(!data){

          // console.log('delete item not found');

          var error = new Error();
          error.message = 'Todo not found with id ' + todoId + ' for user ' + userId;
          error.statusCode = 404; // not found
          throw error;
        }
      });
  }

  function update(todo){

    var error;
    // console.log('starting data todo function');

    if(!todo._id || !todo.userId){

      error = new Error();
      error.message = 'update operation requires todo object to have _id and userId';
      error.statusCode = 400; // bad request
      throw error;
    }

    return TodoModel.findOne({_id: todo._id, userId: todo.userId}).exec()
      .then(function(dbTodo){

        if(!dbTodo){
            error = new Error();
            error.message =  'Todo not found with id ' + todo._id + ' for user ' + todo.userId;
            error.statusCode = 404; // not found
            throw error;
          }

          mongooseUtils.copyFieldsToModel(todo, dbTodo);
          // console.log('now I am saving');

          return dbTodo.save();
      });
  }

  return {
    Model: TodoModel,
    add: add,
    get: get,
    getByUserId: getByUserId,
    deleteById: deleteById,
    update: update

  };
}());
