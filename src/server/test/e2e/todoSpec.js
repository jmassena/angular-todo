// src/server/test/e2e/todoSpec.js


var should = require('should');
var todoRoute = require('../../routes/api/todos.js');
var todoDAL = require('../../data/todo.js');
// var todoDAL2 = require('../../data/todo.js');


var dbUri = 'mongodb://localhost/todo_test';

var mongoose = require('mongoose');
// mongoose.connect(dbUri);


function check(done, assert){
  'use strict';

  try{
    assert();
    done();
  }catch(e){
    done(e);
  }
}

describe('todos', function(){
  'use strict';

  var todos;
  var userId = 666;
  var error;

  // beforeEach(function (done) {
  //   if(mongoose.connection.readyState === 1){
  //     console.log('before: closing connection');
  //     mongoose.connection.close(function(err){
  //       done(err);
  //     });
  //   }
  //   else{
  //     done();
  //   }
  // });

  beforeEach(function (done) {
    if(mongoose.connection.readyState === 0){
      console.log('before: opening connection');
      mongoose.connect(dbUri, function(err){
        done(err);
      });
    }
    else{
      done();
    }
  });

  beforeEach(function (done) {
    console.log('before: removing all todo items');
    todoDAL.Model.remove({}, function(err){
     done(err);
   });
  });


  beforeEach(function(done){

    // add one todo
    var todoItem = {
      title: 'test #1',
      notes: 'test notes'
    };

    todoDAL.add(userId, todoItem)
      .then(function(data){
        done();
      }, done);

  });

  /* global after */
  after(function(done){

    if(mongoose.connection.readyState === 1){
      console.log('after: closing connection');

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

  it('should return exactly one item from get call', function(done){
    todoDAL.get(userId)
      .then(function(data){
        should.exist(data);
        (data).should.have.length(1);
        done();
      })
      .onReject(done);
  });






});
