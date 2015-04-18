// src/server/test/e2e/todoSpec.js

var todo = require('../../routes/api/todos.js');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo_test');


describe('todos', function(){
  'use strict';

  beforeEach(function(done){

    // delete all todos
    todo.model.remove({}, function(){
      done();
    });

    // add one todo
    var userId = 666;
    var todoItem = {
      title: 'test #1',
      notes: 'test notes'
    };

    todo.add(userId, todoItem);
    done();
  });


  it('gets todos', function(done){

  });
});
