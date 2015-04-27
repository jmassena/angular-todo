

var todoServiceMock = (function(){
  'use strict';

  return {
    get: get
  };

  function get($q){
    /* global todoMockData */
    var mockData = todoMockData.get();
    var todos = [];// = mockData.todoList;

    return {
      getTodos: getTodos,
      createTodo: createTodo,
      updateTodo: updateTodo,
      deleteTodo: deleteTodo,
      resetData: resetData,
      getMockData: getMockData,
      todos: todos
    };


    function getMockData(){
      return mockData;
    }
    function resetData(){
      mockData = todoMockData.get();
      todos = null;
    }

    function getTodos(userId){

      var deferred = $q.defer();
      var data = mockData.todoList.filter(function(val){
        return val.userId === userId;
      });
      todos = data;
      deferred.resolve(data);

      return deferred.promise;
    }

    function createTodo(userId, todo) {
      var deferred = $q.defer();

      todo.userId = userId;
      todo.createdDateTime = JSON.stringify(new Date());
      todos.push(todo);
      deferred.resolve(todo);

      return deferred.promise;
    }

    function updateTodo(userId, todo) {
      var deferred = $q.defer();

      for(var i = 0; i < todos.length; i++){
        if(todos[i]._id === todo._Id){
          todos[i] = todo;
          deferred.resolve(todos[i]);
          return deferred.promise;
        }
      }

      // not found
      deferred.reject('No item found with id ' + todo._id + ' for user ' + userId);
      return deferred.promise;
    }

    function deleteTodo(userId, todoId) {
      var deferred = $q.defer();
      for(var i = 0; i < todos.length; i++){
        if(todos[i]._id === todoId){
          deferred.resolve(todos[i]);
          todos.splice(i,1);
          return deferred.promise;
        }
      }

      // not found
      deferred.reject('No item found with id ' + todoId + ' for user ' + userId);
      return deferred.promise;
    }
  }

}());
