// src/server/test/e2e/todoSpec.js


var should = require('should');
var todoRoute = require('../../routes/api/todos.js');
var todoDAL = require('../../data/todo.js');
var todoDAL2 = require('../../data/todo.js');


var dbUri = 'mongodb://localhost/todo_test';

var mongoose = require('mongoose');
// mongoose.connect(dbUri);

describe('todos', function(){
  'use strict';

  var todos;
  var userId = 666;
  var error;

  beforeEach(function (done) {
    if(mongoose.connection.readyState === 1){
      mongoose.connection.close(function(err){
        done(err);
      });
    }
    else{
      done();
    }
  });

  beforeEach(function (done) {
    if(mongoose.connection.readyState === 0){
      mongoose.connect(dbUri, function(err){
        done(err);
      });
    }
    else{
      done();
    }
  });

  beforeEach(function (done) {
    // clear all todos from db
    todoDAL.Model.remove({}, function(err){
     done(err);
   });
  });

  //
  // beforeEach(function(done){
  //
  //   // add one todo
  //   var todoItem = {
  //     title: 'test #1',
  //     notes: 'test notes'
  //   };
  //
  //   todoDAL.add(userId, todoItem,
  //     function(err){
  //         error = err;
  //         done();
  //       },
  //       function(data){
  //         todos = data;
  //         done();
  //       }
  //   );
  //
  // });

  /* global after */
  after(function(done){

    if(mongoose.connection.readyState === 1){
      mongoose.connection.close(function(err){
        done(err);
      });
    }
    else{
      done();
    }
  });

  it('no error on init insert', function(done){
    should.not.exist(error);
    done();
  });

  it('should return data from get call', function(done){
    todoDAL.get(userId,
      done, // error handler
      function(data){
        should.exist(data);
        //(data.length).should.be.exactly(1);
        done();
      }
    );
  });





});
