'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */


var path = require('path');
//var todoDAL = require('../../../server/data/todo.js');
var Q = require('q');
var mockDataProvider = require('./todo.data.mock.js')();


var usersRootUri = 'localhost:3000/api/users';

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


var request = require('superagent');

function appGet(userId, done){

  var deferred = Q.defer();
  request
    .get(urlHelper.get(userId))
    // .set('Accept', 'application/json')
    .end(function(err, res){
      if(err){deferred.reject(new Error(err));}
      else{deferred.resolve(res);}
    });
  return deferred.promise;
}

function appDelete(userId, todoId){
  var deferred = Q.defer();
  request
    .del(urlHelper.delete(userId, todoId))
    // .set('Accept', 'application/json')
    .end(function(err, res){
      if(err){deferred.reject(new Error(err));}
      else{deferred.resolve(res);}
    });
    return deferred.promise;
}

function appCreate(userId, todo){
  var deferred = Q.defer();
  request
    .post(urlHelper.post(userId))
    .send(todo)
    // .set('Accept', 'application/json')
    .set('Content-type', 'application/json')
    .end(function(err, res){
      if(err){deferred.reject(new Error(err));}
      else{deferred.resolve(res);}
    });
    return deferred.promise;
}

/* Testing todo page functionality */
describe('Todo Page', function(){

  var testData;

  var x = [1,2,3];
  //var y = angular.copy(x);

  beforeEach(function(done){
    testData = mockDataProvider.get();
    // console.log('testdata: ' + JSON.stringify(testData));
    expect(testData).toBeDefined();
    expect(testData.todoList).toBeDefined();
    expect(testData.todoList.length).toBeGreaterThan(0);
    done();
  });


  // get existing items
  var dbItems = [];
  beforeEach(function (done) {
    appGet(testData.userId2)
    .then(function(res){
      dbItems = res.body;
      console.log('Data before delete: ' + res.body.length);
      done();
    },done);
  });
  // delete them
  beforeEach(function (done) {
    if(dbItems == null || dbItems.length === 0){
      done();
    }
    var promises = dbItems.map(function(item){
      return appDelete(item.userId, item._id);
    });

    Q.all(promises)
    .then(function(){
      done();
    },done);
  });
  // verify delete
  beforeEach(function (done) {
    appGet(testData.userId2)
    .then(function(res){
      expect(res.body).toBeDefined();
      dbItems = res.body;
      console.log('Data at after delete: ' + res.body.length);
      expect(res.body.length).toEqual(0);
      done();
    },function(err){
      expect(err).not.toBeDefined();
      done();
    });
  });
  // add test data items
  beforeEach(function (done) {
    expect(dbItems.length).toEqual(0);
    var todo = testData.todoList[4];
    todo._id = null;
    // console.log('first test todo: ' + JSON.stringify(todo));

    // appCreate(todo.userId, todo)
    //   .then(function(data){
    //     console.log('todo created!!!');
    //     done();
    //   },
    //   function(err){
    //     console.log('error creating todo: ' + err);
    //     //console.log('error creating todo: ' + JSON.stringify(err));
    //
    //     done();
    //   });

    var promises = testData.todoList.map(function(item){
      item._id = null;
      return appCreate(item.userId, item);
    });

    Q.all(promises)
    .then(function(){
      done();
    },done);

  });


  //console.log('first todo: ' + JSON.stringify(testData.todoList[0]));

  //
  //
  // // setup mock data in db
  // beforeEach(function (done) {
  //
  //   var promises = testData.todoList.map(function(item){
  //     todoDAL.add(item.userId, item);
  //   });
  //
  //   Q.all(promises).
  //     then(function(){
  //       console.log('done loading data');
  //       done();
  //     },done);
  //
  // });


  it('should have no todo items at start for test user', function(){
    // start page
    // browser.get('/todo');
    //
    // var count = element.all(by.css('ul.navbar-nav>li')).count();
    // expect(count).toEqual(4);
    expect(true).toEqual(true);
  });

  xit('should show the create popup when clicking "add" button', function(){

  });

  xit('should hide the create popup when clicking "Close" button on add popup', function(){

  });

  xit('should hide the create popup when clicking top-right "Close" icon on add popup', function(){

  });

  xit('should not submit if create popup has no title', function(){

  });

  xit('should create a new todo item', function(){

  });

  xit('should show an edited todo item after editing', function(){

  });

  xit('should show a confirm popup when clicking the delete icon', function(){

  });

  xit('should hide the confirm popup and not submit when deleting and clicking "no" on confirm popup', function(){

  });

  xit('should delete a todo item when deleting and clicking "yes" on the confirm popup', function(){

  });

  xit('should create a new todo item', function(){

  });

});
