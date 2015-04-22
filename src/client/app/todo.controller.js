// public/ang/navbar.js

/* global jQuery */
(function(angular) {
  'use strict';

  angular
      .module('app')
      .controller('TodoCtrl', TodoCtrl);

      TodoCtrl.$inject = ['todoService'];
      function TodoCtrl(todoService){

        // Todo schema
        // _id: nextId,
        // status: todo.status,
        // title: todo.title,
        // notes: todo.notes,
        // dueDateTime: todo.dueDateTime,
        // userId: 666});


        var EDIT_MODES = {
          EDIT: 'edit',
          CREATE: 'create'
        };

        var userId = 777;  // hard coded for now
        var data;
        var initialized;

        var vm = this;
            vm.EDIT_MODES = EDIT_MODES;
            vm.userId = userId;
            vm.todos = todoService.todos;
            vm.pageTitle = 'To-Do Page';
            vm.getTodos = getTodos;
            vm.createTodo = createTodo;
            vm.updateTodo = updateTodo;
            vm.deleteTodo = deleteTodo;
            vm.submitTodo = submitTodo;
            vm.clearForm = clearForm;
            vm.now = new Date();
            vm.selectedTodoId = null;

            vm.formData = {};
            vm.errorMsg = null;
            vm.editMode = null;


        if(!initialized){
          getTodos();
          initialized = true;
        }



        function clearForm(){
          vm.formData.title = null;
          vm.formData.notes = null;
          vm.formData.dueDateTime = null;
        }
        function setDataFromService(){
          vm.todos = todoService.todos;
        }

        function getTodos(){
          todoService.getTodos(vm.userId)
            .then(setDataFromService);
        }

        function submitTodo(){
          if(vm.editMode === EDIT_MODES.CREATE){
            createTodo();
          }
          else if(vm.editMode === EDIT_MODES.EDIT){
            updateTodo();
          }
        }

        // TODO: check if item was added by checking that return data exists
        function createTodo(){

          todoService.createTodo(vm.userId, vm.formData)
            .then(function(){
              clearForm();
              getTodos();
            });
        }

        function getSelectedTodo(){
          var todos = vm.todos.filter(function(val){
            return val._id === vm.selectedTodoId;
          });

          if(todos.length === 1){
            return todos[0];
          }
          else{
            return null;
          }
        }

        function updateTodo(){

          var todo = getSelectedTodo();
          if(todo){
            // clone todo so we don't affect original
            //todo = JSON.parse(JSON.stringify(todo));
            todo = jQuery.extend(true, {}, todo);

            for(var key in vm.formData){
              if(Object.prototype.hasOwnProperty.call(vm.formData, key)){
                todo[key] = vm.formData[key];
              }
            }

            todoService.updateTodo(vm.userId, todo)
              .then(function(){
                vm.selectedTodoId = null;
                getTodos();
              });
          }
        }

        // TODO: check if item was deleted by checking that return data exists
        function deleteTodo(){
          todoService.deleteTodo(vm.userId, vm.selectedTodoId)
            .then(function(){
              vm.selectedTodoId = null;
              getTodos();
            });
        }
      }

})(this.angular);
