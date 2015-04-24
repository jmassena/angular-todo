// public/ang/navbar.js

/* global jQuery */
/* global moment */
(function(angular) {
  'use strict';

  angular
      .module('app')
      .controller('TodoCtrl', TodoCtrl);

      TodoCtrl.$inject = ['todoService', '$log'];
      function TodoCtrl(todoService, $log){

        // Todo schema
        // _id: nextId,
        // done: todo.done,
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
            // properties
            vm.EDIT_MODES = EDIT_MODES;
            vm.userId = userId;
            vm.todos = todoService.todos;
            vm.pageTitle = 'To-Do Page';
            vm.now = new Date();
            vm.selectedTodoId = null;
            vm.errorMsg = null;
            vm.editMode = null;
            vm.formData = {title: null, notes: null, dueDateTime: null};

            // functions
            vm.getTodos = getTodos;
            vm.createTodo = createTodo;
            vm.updateTodo = updateTodo;
            vm.deleteTodo = deleteTodo;
            vm.submitTodo = submitTodo;
            vm.isOverDue = isOverDue;
            vm.clearForm = clearForm;
            vm.truncate = truncate;
            vm.dateOrder = dateOrder;
            vm.dueDateOrder = dueDateOrder;
            vm.setForEdit = setForEdit;

        if(!initialized){
          getTodos();
          initialized = true;
        }

        function isOverDue(dueDate){
          if(dueDate == null || dueDate.length === 0){
            return null;
          }
          else{
            return new Date(dueDate) < new Date();
          }
        }

        function truncate(str, len){
          if(str && str.length > len){
             return str.substring(0, len - 3) + '...';//'…';
          }
          return str;
        }

        function dueDateOrder(todo){
          return dateOrder(todo.dueDateTime);
        }


        function dateOrder(a){

          if(!a){
            // i think this is the max date
            // +100,000,000 days relative to jan, 1970 UTC
            var d = new Date(8640000000000000);
            return d.toISOString();
          }
          else{
            return a;
          }
        }

        function setForEdit(todo){
          vm.editMode = EDIT_MODES.EDIT;
          vm.selectedTodoId = todo._id;
          vm.formData.title = todo.title;
          vm.formData.notes = todo.notes;
          vm.formData.done = todo.done;

          if(todo.dueDateTime != null && todo.dueDateTime != ''){
            var df = moment(todo.dueDateTime);

            // have to set date of picker else it only picks it??
            var dp = document.getElementById('newTodoDueDate');
            var dpc = $('#newTodoDueDate').data('DateTimePicker');
            dpc.date(df);
          }
        }

        function clearForm(){
          // never clear actual form!! it will mess up validation.
          vm.formData.title = '';
          vm.formData.notes = '';
          vm.formData.dueDateTime = '';
          vm.formData.done = false;

          vm.todoForm.$setUntouched();
          vm.todoForm.$setPristine();
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
            todo = angular.copy(todo);

            for(var key in vm.formData){
              if(Object.prototype.hasOwnProperty.call(vm.formData, key)){
                todo[key] = vm.formData[key];
              }
            }

            todoService.updateTodo(vm.userId, todo)
              .then(function(){
                clearForm();
                vm.selectedTodoId = null;
                getTodos();
              });
          }
        }

        // TODO: check if item was deleted by checking that return data exists
        function deleteTodo(todoId){
          todoService.deleteTodo(vm.userId, todoId)
            .then(function(){
              vm.selectedTodoId = null;
              getTodos();
            });
        }
      }

})(this.angular);
