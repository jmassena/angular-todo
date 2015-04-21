// src/server/test/e2e/todo.route.spec.js
'use strict';

/* global before */
/* global after */

process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var request = require('supertest');
var should = require('should');
var testUtils = require('../../common/testUtils.js');
var app = require('../../app.js');
var todoDAL = require('../../data/todo.js');
var testData = require('./todo.data.js');
var path = require('path');

var dbUri = 'mongodb://localhost/todo_test';
var usersRootUri = '/api/users';


var todoData;

var urlHelper = {
  get: function(userId){
    return path.join(usersRootUri, userId.toString(), 'todos');
  },
  post: function(userId){
    return path.join(usersRootUri, userId.toString(), 'todos');
  },
  put: function(userId, todoId){
    return path.join(usersRootUri, userId.toString(), 'todos', todoId.toString());
  },
  delete: function(userId, todoId){
    return path.join(usersRootUri, userId.toString(), 'todos', todoId.toString());
  }
};




describe('Todo routes', function(){

  // open db connection if needed (if mocha stays active between runs then connection still exists)
  before(function (done) {
    testUtils.connect(mongoose, dbUri, done);
  });

  // clear any data from todo collection
  beforeEach(function (done) {
    // console.log('before: removing all todo items');
    todoDAL.Model.remove({}, function(err){
     done(err);
   });
  });

  beforeEach(function(done){
    todoData = testData();

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
    testUtils.closeConnection(mongoose, done);
  });


  it('should get all todos for user #2', function(done){

    request(app)
      .get(urlHelper.get(todoData.userId2))
      .expect(200)
      .accept('json')
      .end(function(err, res){
        should.not.exist(err);
        should.exist(res.body);
        res.body.length.should.be.equal(3);
        done();
      });
  });


  it('should post a new todo for user #2', function(done){

    // post
    request(app)
      .post(urlHelper.post(todoData.userId2))
      .send({title:'new todo', notes: 'notes for new todo'})
      .expect(201)
      .accept('json')
      .end(function(err, res){
        should.not.exist(err);
        should.exist(res.body);

        // get
        request(app)
          .get(urlHelper.get(todoData.userId2))
          .expect(200)
          .accept('json')
          .end(function(err, res){
            should.not.exist(err);
            should.exist(res.body);
            res.body.length.should.be.equal(4);
            done();
          });
      });
  });

  it('should update a todo for user #2', function(done){

    var newTitle = 'test #2.5';

    request(app)
      // get
      .get(urlHelper.get(todoData.userId2))
      .expect(200)
      .accept('json')
      .end(function(err, res){
        should.not.exist(err);
        should.exist(res.body);
        res.body.length.should.be.equal(3);
        var todoToUpdate = res.body[0];
        todoToUpdate.title = newTitle;

        // put
        request(app)
          .put(urlHelper.put(todoData.userId2, todoToUpdate._id))
          .send(todoToUpdate)
          .expect(200)
          .accept('json')
          .end(function(err, res){
            should.not.exist(err);

        // get
        request(app)
          .get(urlHelper.get(todoData.userId2))
          .expect(200)
          .accept('json')
          .end(function(err, res){
            should.not.exist(err);
            should.exist(res.body);
            var updatedTodoArr = res.body.filter(function(val){
              return val._id === todoToUpdate._id;
            });
            updatedTodoArr.length.should.be.equal(1);
            updatedTodoArr[0].title.should.be.equal(newTitle);
            done();
        }); // end get 2
      }); // end put
    }); // end get 1
  });// end it


});
