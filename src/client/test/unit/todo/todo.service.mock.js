
// this service initializes a list of todos
// and has methods for create, get, update, delete which
// will delete from the internal list (json object)




var mockTodoService = (function(){
    'use strict';

    var todos = [];

    return{
      init: init,
      getApi: getApi
    };

    function init(){

      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      todos = [];
      todos.push({
        _id: 1,
        status: null,
        title: 'Test todo #1',
        notes: 'Testing first todo item',
        dueDateTime: tomorrow,
        ownerPersonId: 666}
        );
    }

    function getApi(){

      var api = {};
          api.getTodos = getTodos;
          api.updateTodo = updateTodo;
          api.createTodo = createTodo;
          api.deleteTodo = deleteTodo;

      return api;

      function getTodos(){

        return todos;
      }

      function updateTodo(todo){

        var todoIdx = findTodoIdx(todo._id);

        if(todoIdx !== -1){
          todos[todoIdx] = todo;
          return true;
        }
        else{
          return false;
        }
      }

      function createTodo(todo){

        var ids = [];
        for(var i = 0; i < todos.length; i++){
          ids[todos[i]._id] = true;
        }

        var nextId = -1;
        for(var i = 1; i < ids.length; i++){
          if(!ids[i]){
            nextId = i;
          }
        }

        if(nextId === -1){
          // ids are contiguous, pick maxval +1
          nextId = ids.length ;
        }

        todos.push({
          _id: nextId,
          status: todo.status,
          title: todo.title,
          notes: todo.notes,
          dueDateTime: todo.dueDateTime,
          ownerPersonId: 666});
      }

      function deleteTodo(todoId){
        var todoIdx = findTodoIdx(todoId);

        if(todoIdx !== -1){
          todos.splice(todoIdx, 1);
        }
      }

      function findTodoIdx(id){
        for(var i = 0; i < todos.length; i++){
          if(todos[i]._id === id){
            return i;
          }
        }

        return -1;
      }
    }


}());
