// public/ang/navbar.js


(function(angular) {
  'use strict';

  angular
      .module('app')
      .controller('TodoCtrl', TodoCtrl);

      TodoCtrl.$inject = ['todoService'];
      function TodoCtrl(todoService){

        var userId = 777;  // hard coded for now
        var data;
        var initialized;

        var vm = this;
            vm.userId = userId;
            // done in getTodos()
            //vm.todos = data? data.todos: null;
            vm.todos = todoService.todos;
            vm.pageTitle = 'To-Do Page';
            vm.getTodos = getTodos;
            vm.createTodo = createTodo;
            vm.updateTodo = updateTodo;
            vm.deleteTodo = deleteTodo;
            vm.now = new Date();

        if(!initialized){
          getTodos();
          initialized = true;
        }

        function setDataFromService(){
          vm.todos = todoService.todos;
        }

        function getTodos(){
          todoService.getTodos(vm.userId)
            .then(setDataFromService);
        }

        // TODO: check if item was added by checking that return data exists
        function createTodo(todo){
          todoService.createTodo(vm.userId, todo)
            .then(getTodos());
        }

        // TODO: check if item was updated by checking that return data exists
        function updateTodo(todo){
          todoService.updateTodo(vm.userId, todo)
            .then(getTodos());
        }

        // TODO: check if item was deleted by checking that return data exists
        function deleteTodo(todoId){
          todoService.updateTodo(vm.userId, todoId)
            .then(getTodos());
        }
      }

})(this.angular);
