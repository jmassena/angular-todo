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

function cloneDeep(obj){
  'use strict';
  return JSON.parse(JSON.stringify(obj));
}

function connect(mongoose, uri, done){
  'use strict';
  if(mongoose.connection.readyState === 0){
    // console.log('before: opening connection');
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
    // console.log('after: closing connection');

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

  var todoData;
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


    var todoList = [
      {userId: userId1, title: 'test #1', notes: 'notes test #1', dueDateTime: tomorrow},
      {userId: userId1, title: 'test #2', notes: 'notes test #2', dueDateTime: tomorrow},

      {userId: userId2, title: 'test #1', notes: 'notes test #1', dueDateTime: tomorrow},
      {userId: userId2, title: 'test #2', notes: 'notes test #2', dueDateTime: tomorrow},
      {userId: userId2, title: 'test #3', notes: 'notes test #3', dueDateTime: tomorrow}
    ];

    todoData = {};
    todoData.todoList = todoList;
    todoData.getTodos = function(userId){
      return todoList.filter(function(val){
        return val.userId === userId;
      });
    };

    done();
  });

  // open db connection if needed (if mocha stays active between runs then connection still exists)
  before(function (done) {
    connect(mongoose, dbUri, done);
  });

  // clear any data from todo collection
  beforeEach(function (done) {
    // console.log('before: removing all todo items');
    todoDAL.Model.remove({}, function(err){
     done(err);
   });
  });


  beforeEach(function(done){

    var promise;

    todoData.todoList.forEach(function(item, idx){
      if(!promise){
        promise = todoDAL.add(item.userId, item);
      }
      else{
        promise = promise.chain(todoDAL.add(item.userId, item));
      }
    });

    promise.then(function(){done();}, done);

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
        data.should.be.instanceof(Array);
        data.length.should.be.equal(todoData.getTodos(userId2).length);
        done();
      })
      .onReject(done);
  });


  it('should create an item for user #2', function(done){
    todoDAL.add(userId2, {title:'new todo', notes: 'notes for new todo'})
      .then(function(){
        return todoDAL.getByUserId(userId2);
      })
      .then(function(data){
        data.should.be.instanceof(Array);
        data.length.should.be.equal(todoData.getTodos(userId2).length + 1);

        data.filter(function(val){
          return (val.title === 'new todo');
        })
        .length.should.be.equal(1);

        done();
      })
      .onReject(done);
  });


  it('should update an item for user #2', function(done){

    var newTitle = 'test #2.5';
    var testTodo;

    todoDAL.get({userId: userId2, title: 'test #2'})
      .then(function(data){
        should.exist(data);
        data.length.should.equal(1);

        testTodo = data[0];
        testTodo.title = newTitle;

        return todoDAL.update(testTodo);
      })
      .then(function(){
        return todoDAL.get({userId: userId2, _id: testTodo._id});
      })
      .then(function(data){
        should.exist(data);
        data.length.should.equal(1);

        // console.log('updated item ' + data[0]);
        data[0].title.should.be.equal(newTitle);
        done();
      })
      .onReject(done);
  });

  it.skip('should delete an item for user #2', function(done){

  });


});
