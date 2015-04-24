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

        var EDIT_MODES = {
          EDIT: 'edit',
          CREATE: 'create'
        };

        var userId = 777;  // hard coded for now
        var data;
        var initialized;
        var now = new Date();

        var vm = this;
            // properties
            vm.EDIT_MODES = EDIT_MODES;
            vm.userId = userId;
            vm.todos = todoService.todos;
            vm.pageTitle = 'To-Do Page';
            vm.selectedTodoId = null;
            vm.errorMsg = null;
            vm.editMode = null;
            vm.formData = {title: null, notes: null, dueDateTime: null};

            // functions
            vm.getTodos = getTodos;
            vm.createTodo = createTodo;
            vm.updateTodo = updateTodo;
            vm.updateDoneStatus = updateDoneStatus;
            vm.deleteTodo = deleteTodo;
            vm.submitTodo = submitTodo;
            vm.clearForm = clearForm;
            vm.truncate = truncate;
            vm.dueDateOrderDesc = dueDateOrderDesc;
            vm.setForEdit = setForEdit;

        if(!initialized){
          getTodos();
          initialized = true;
        }

        function massageTodos(todos){
          todos.forEach(function(item){

              // normalize due date
              item.dueDateTime = (item.dueDateTime == null || item.dueDateTime.length === 0)?
                null:
                new Date(item.dueDateTime);

              item.hasDueDate = (item.dueDateTime != null);
              item.overdue = !item.done && item.hasDueDate && (item.dueDateTime < now);

              if(item.hasDueDate && !item.done){

                item.dueMilliseconds = item.dueDateTime - now;
                item.dueHours = Math.floor(item.dueMilliseconds/(1000*60*60));
                item.dueDays = Math.floor(item.dueHours/24);

                if(item.dueDays < 0){
                  item.dueMessage = (-1 * item.dueDays) + ' day' + plural(item.dueDays) + ' overdue';
                }
                else if(item.dueHours < 0 ){
                  item.dueMessage = (-1 * item.dueHours) + ' hour' + plural(item.dueHours) + ' overdue';
                }
                else if(item.dueDays > 0){
                  item.dueMessage = item.dueDays + ' day' +  plural(item.dueDays);
                }
                else if(item.dueHours > 0){
                  item.dueMessage = item.dueHours + ' hour' + plural(item.dueHours);
                }
              }
          });
        }

        function plural(val){
          if(Math.abs(val) > 1){
            return 's';
          }
          else{
            return '';
          }
        }

        function truncate(str, len){
          if(str && str.length > len){
             return str.substring(0, len - 3) + '...';//'…';
          }
          return str;
        }

        function dueDateOrderDesc(todo){
          return dateOrder(todo.dueDateTime);
        }

        function dateOrder(a){

          if(a == null || a.length ===0 ){
            // i think this is the max date
            // +100,000,000 days relative to jan, 1970 UTC
            var d = new Date(8640000000000000);
            return d.getTime();
          }
          else {
            return new Date(a).getTime();
          }
        }

        function setForEdit(todo){
          vm.editMode = EDIT_MODES.EDIT;
          vm.selectedTodoId = todo._id;
          vm.formData.title = todo.title;
          vm.formData.notes = todo.notes;
          vm.formData.done = todo.done;

          if(todo.dueDateTime != null && todo.dueDateTime !== ''){
            var df = moment(todo.dueDateTime);

            // have to set date of picker else it only picks it??
            var dpc = $('#editTodoDueDate').data('DateTimePicker');
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

        function getTodos(){
          todoService.getTodos(vm.userId)
            .then(function(){
              vm.todos = angular.copy(todoService.todos);
              massageTodos(vm.todos);
            });
        }

        function submitTodo(){
          if(vm.editMode === EDIT_MODES.CREATE){
            createTodo();
          }
          else if(vm.editMode === EDIT_MODES.EDIT){
            updateSelectedTodo();
          }
        }

        function createTodo(){
          todoService.createTodo(vm.userId, vm.formData)
            .then(function(){
              clearForm();
              getTodos();
            });
        }

        function getLocalTodoById(id){
          var todos = vm.todos.filter(function(val){
            return val._id === id;
          });

          if(todos.length === 1){
            return todos[0];
          }
          else{
            return null;
          }
        }

        function updateDoneStatus(todoId){
          var todo = getLocalTodoById(todoId);
          updateTodo(todo);
        }

        function updateSelectedTodo(){

          var todo = getLocalTodoById(vm.selectedTodoId);
          if(todo){
            // clone todo so we don't affect original
            todo = angular.copy(todo);

            for(var key in vm.formData){
              if(Object.prototype.hasOwnProperty.call(vm.formData, key)){
                todo[key] = vm.formData[key];
              }
            }

            updateTodo(todo);
          }
        }

        function updateTodo(todo){

          if(todo.dueDateTime === ''){
            todo.dueDateTime = null;
          }

          todoService.updateTodo(vm.userId, todo)
            .then(function(){
              clearForm();
              vm.selectedTodoId = null;
              getTodos();
            });
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
