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

var dbUri = 'mongodb://localhost/todo_test';

var todoData;


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

  it('should return all user#2 todos', function(done){

    request(app)
      .get('/api/users/' + todoData.userId2 + '/todos')
      .expect(200)
      //.expect('Content-Type', 'application/json; charset=utf-8')
      .accept('json')
      .end(function(err, res){
        should.not.exist(err);
        should.exist(res.body);
        //console.log(res.body.length);
        //console.log('res.body: ' + JSON.stringify(res.body));
        res.body.length.should.be.equal(3);
        done();
      });
  });
});
