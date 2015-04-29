// jasmine test run by protractor
'use strict';

var path = require('path');
var todoDAL = require('../../../server/data/todo.js');
var Q = require('q');

console.log('todoDAL: ' + (todoDAL?'found':'not found'));

var userId = 777;
var usersRootUri = '/api/users';

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

/* Testing todo page functionality */
describe('Todo Page', function(){


  // var ptor = protractor.getInstance();
  // ptor.waitForAngular();
  // console.log('done waiting for anugular');

  var testData = require('../data/todo.data.mock.js');
  console.log('testData: ' + (testData?'found':'not found'));
  console.log('testData: ' + (testData.get().todoList.length>0?'found':'not found'));


  // // clear any data from todo collection
  // beforeEach(function (done) {
  //   todoDAL.Model.remove({}, function(err){
  //    done(err);
  //  });
  // });


  // // clear any data from todo collection
  // beforeEach(function (done) {
  //   todoData = testData.get();
  //
  //   var promises = todoData.todoList.map(function(item, idx){
  //     todoDAL.add(item.userId, item);
  //   });
  //   Q.all(function(){
  //     console.log('calling done for inserts');
  //     done();
  //     }, done);
  // });

  // beforeEach(inject(function('$controller', 'todoService', '$log'){
  //
  //   var vm = $controller('TodoCtrl', {scope:{}, todoService: todoService, $log: $log} );
  //   var todos = vm.getTodos();
  //   todos.forEach(function(todo){
  //     vm.deleteTodo(todo._id);
  //   });
  // }));

  // // why not do this with http calls?
  // beforeEach(inject(function($http, $q){
  //    var todos;
  //    $http.get(urlHelper.get(userId))
  //    .then(function(data){
  //      var promises = data.map(function(item){
  //        return $http.delete(urlHelper.delete(userId, item));
  //      });
  //      return $q.all(promises);
  //    })
  //    .then(function (){
  //      console.log('calling done');
  //      done();
  //    });
  // }));


  it('should have no todo items at start for test user', function(){
    console.log('starting test');
    expect(true).toEqual(true);
    done();
    // start page
    // browser.get('/todo');
    //
    // var count = element.all(by.css('ul.navbar-nav>li')).count();
    // expect(count).toEqual(4);
  });
  //
  // xit('should show the create popup when clicking "add" button', function(){
  //
  // });
  //
  // xit('should hide the create popup when clicking "Close" button on add popup', function(){
  //
  // });
  //
  // xit('should hide the create popup when clicking top-right "Close" icon on add popup', function(){
  //
  // });
  //
  // xit('should not submit if create popup has no title', function(){
  //
  // });
  //
  // xit('should create a new todo item', function(){
  //
  // });
  //
  // xit('should show an edited todo item after editing', function(){
  //
  // });
  //
  // xit('should show a confirm popup when clicking the delete icon', function(){
  //
  // });
  //
  // xit('should hide the confirm popup and not submit when deleting and clicking "no" on confirm popup', function(){
  //
  // });
  //
  // xit('should delete a todo item when deleting and clicking "yes" on the confirm popup', function(){
  //
  // });
  //
  // xit('should create a new todo item', function(){
  //
  // });

});
