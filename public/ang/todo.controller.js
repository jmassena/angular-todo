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
            vm.pageTitle = 'To-Do Page';
            vm.getTodos = getTodos;
            vm.createTodo = createTodo;
            vm.updateTodo = updateTodo;
            vm.deleteTodo = deleteTodo;

        if(!initialized){
          getTodos();
          initialized = true;
        }

        function setDataFromService(){
          data = todoService.data;
          vm.todos = data? data.todos: null;
        }

        function getTodos(){
          todoService.getTodos(vm.userId)
            .then(setDataFromService);
        }

        function createTodo(todo){
          todoService.createTodo(vm.userId, todo)
            .then(setDataFromService);
        }

        function updateTodo(todo){
          todoService.updateTodo(vm.userId, todo)
            .then(setDataFromService);
        }

        function deleteTodo(todoId){
          todoService.updateTodo(vm.userId, todoId)
            .then(setDataFromService);
        }
      }

})(this.angular);
