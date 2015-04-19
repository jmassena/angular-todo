// src/server/test/e2e/todoSpec.js

/* global before */
/* global after */

var should = require('should');
var todoRoute = require('../../routes/api/todos.js');
var todoDAL = require('../../data/todo.js');
// var todoDAL2 = require('../../data/todo.js');


var dbUri = 'mongodb://localhost/todo_test';

var mongoose = require('mongoose');
// mongoose.connect(dbUri);


function connect(mongoose, uri, done){
  'use strict';
  if(mongoose.connection.readyState === 0){
    console.log('before: opening connection');
    mongoose.connect(dbUri, function(err){
      done(err);
    });
  }
  else{
    done();
  }
}
function closeConnection(mongoose, done){
  'use strict';
  if(mongoose.connection.readyState === 1){
    console.log('after: closing connection');

    mongoose.connection.close(function(err){
      done(err);
    });
  }
  else{
    done();
  }
}

function addDays(date, days){
  'use strict';

  var newDate = new Date(date);
  newDate.setDate(newDate.getDate + days);
  return newDate;
}

describe('todos', function(){
  'use strict';

  var todoList;
  var userId1 = 666;
  var userId2 = 777;

  var today;
  var yesterday;
  var tomorrow;

  // prepare test data
  before(function(done){

    today = new Date();
    tomorrow = addDays(today, 1);
    yesterday = addDays(today, -1);


    todoList = [
      {title: 'test #1', notes: 'notes test #1', dueDateTime: tomorrow},
      {title: 'test #2', notes: 'notes test #2', dueDateTime: tomorrow},

      {title: 'test #1', notes: 'notes test #1', dueDateTime: tomorrow},
      {title: 'test #2', notes: 'notes test #2', dueDateTime: tomorrow},
      {title: 'test #3', notes: 'notes test #3', dueDateTime: tomorrow}
    ];

    done();
  });

  // open db connection if needed (if mocha stays active between runs then connection still exists)
  before(function (done) {
    connect(mongoose, dbUri, done);
  });

  // clear any data from todo collection
  beforeEach(function (done) {
    console.log('before: removing all todo items');
    todoDAL.Model.remove({}, function(err){
     done(err);
   });
  });


  beforeEach(function(done){

    // todoDAL.add(userId1, todoList[0])
    // .then(function(){
    //   return todoDAL.add(userId1, todoList[1]);
    // })
    // .then(function(){
    //   return todoDAL.add(userId2, todoList[2]);
    // })
    // .then(function(){
    //   return todoDAL.add(userId2, todoList[3]);
    // })
    // .then(function(){
    //   return todoDAL.add(userId2, todoList[4]);
    // })
    // .then(function(){done();}, done);


    todoDAL.add(userId1, todoList[0])
    .then(function(){
      return todoDAL.add(userId1, todoList[1]);
    })
    .then(function(){
      return todoDAL.add(userId2, todoList[2]);
    })
    .then(function(){
      return todoDAL.add(userId2, todoList[3]);
    })
    .then(function(){
      return todoDAL.add(userId2, todoList[4]);
    })
    .then(function(){done();}, done);


  });

  after(function(done){
    closeConnection(mongoose, done);
  });


  // validate we can create, update, delete, get with DAL
  // We will do more extensive integration test later with routes
  it('should get all items for user #2', function(done){
    todoDAL.getByUserId(userId2)
      .then(function(data){
        should.exist(data);
        // console.log('data: ' + JSON.stringify(data));
        // console.log('length: ' + data.length);
        data.should.be.instanceof(Array);
        data.length.should.be.equal(3);
        done();
      })
      .onReject(done);
  });


  it.skip('should create an item for user #2', function(done){

  });


  it.skip('should update an item for user #2', function(done){

  });

  it.skip('should delete an item for user #2', function(done){

  });


});
