describe('Controller: TodoCtrl', function() {
  'use strict';

    var scope,
        log,
        vm,
        mockDataService,
        mockData;

    var userId = 777; // todo ctrl is hard coded to this user id

    beforeEach(module('app'));

    beforeEach(inject(function($controller, $log, $q, $rootScope){

        log = $log;
        scope = {};

        /* global todoServiceMock */
        mockDataService = todoServiceMock.get($q);
        mockData = mockDataService.getMockData();

        vm = $controller('TodoCtrl',
         {$scope: scope, todoService: mockDataService, $log: $log});

        $rootScope.$digest();
    }));

    function isDate (d){
      return Object.prototype.toString.call(d) === '[object Date]';
    }

    it('should be initialized with users todo items', function() {
      expect(vm.todos).toBeDefined();

      var userItems = mockData.todoList.filter(function(todo){
        return todo.userId === userId;
      });
      expect(vm.todos.length).toEqual(userItems.length);
    });

    it('should  clear invalid due date', function() {
      var dateItems = vm.todos.filter(function(todo){
        return todo.dueDateTime != null;
      });
      expect(dateItems.length).toEqual(4);
    });

    it('should normalize the dueDateTimes', function() {
      var invalid = vm.todos.filter(function(todo){
        return todo.dueDateTime != null && !isDate(todo.dueDateTime);
      });
      expect(invalid.length > 0?invalid:null).toBeNull();
    });


    it('should set hasDueDate true if dueDate set', function() {
      var invalid = vm.todos.filter(function(todo){
        return (todo.dueDateTime != null && !todo.hasDueDate);
      });
      expect(invalid.length > 0?invalid:null).toBeNull();
    });
    it('should set hasDueDate false if updated date null', function() {
      var invalid = vm.todos.filter(function(todo){
        return (todo.dueDateTime == null && todo.hasDueDate);
      });
      expect(invalid.length > 0?invalid:null).toBeNull();
    });


    it('should set overdue true if not done and dueDate before today', function() {
      var now = new Date();
      var invalid = vm.todos.filter(function(todo){
        return (!todo.done && todo.dueDateTime != null
          && todo.dueDateTime < now && !todo.overdue);
      });
      expect(invalid.length > 0?invalid:null).toBeNull();
    });
    it('should set overdue false if done or dueDate is null', function() {
      var invalid = vm.todos.filter(function(todo){
        return ((todo.done || todo.dueDateTime == null) && todo.overdue);
      });
      expect(invalid.length > 0?invalid:null).toBeNull();
    });


    it('should set due times if todo not done and it has a dueDate', function() {
      var invalid = vm.todos.filter(function(todo){
        return (!todo.done && todo.dueDateTime != null
          && (todo.dueMilliseconds == null
           || todo.dueHours == null
           || todo.dueDays == null));
      });
      expect(invalid.length > 0?invalid:null).toBeNull();
    });
    it('should not set due times if todo is done or does not have a dueDate', function() {
      var invalid = vm.todos.filter(function(todo){
        return ((todo.done || todo.dueDateTime == null)
          && (todo.dueMilliseconds != null
           || todo.dueHours != null
           || todo.dueDays != null));
      });
      expect(invalid.length > 0?invalid:null).toBeNull();
    });


    it('should not set an overdue message if done or has no due date', function() {

      var items = vm.todos.filter(function(todo){
        return (todo.done || todo.dueDateTime == null);
      });
      expect(items.length).toBeGreaterThan(0);

      var invalid = items.filter(function(todo){
        return (todo.dueMessage != null);
      });
      expect(invalid.length > 0?invalid:null).toBeNull();
    });
    it('should set an overdue message if overdue and not done', function() {

      var items = vm.todos.filter(function(todo){
        return (todo.overdue);
      });
      expect(items.length).toBeGreaterThan(0);

      var invalid = items.filter(function(todo){
        return (!/overdue$/.test(todo.dueMessage));
      });
      expect(invalid.length > 0?invalid:null).toBeNull();
    });
    it('plural should set a "due in" message if has due date and not overdue and not done', function() {

      var items = vm.todos.filter(function(todo){
        return (!todo.overdue && todo.hasDueDate && !todo.done);
      });
      expect(items.length).toBeGreaterThan(0);

      var invalid = items.filter(function(todo){
        return (!/^\d+ (day|hour)s*$/.test(todo.dueMessage));
      });
      expect(invalid.length > 0?invalid:null).toBeNull();
    });

    it('truncate should truncate strings', function() {
        var testStr = '123456789012345667890';
        var truncatedStr = vm.truncate(testStr,10);

        expect(truncatedStr.length).toEqual(10);
    });

    // 19
    it('dueDateOrderDesc should return a greater value for null dates', function() {

        var resNull = vm.dueDateOrderDesc({dueDateTime: null});
        var resToday = vm.dueDateOrderDesc({dueDateTime: new Date()});

        expect(resNull).toBeGreaterThan(resToday);
    });

    it('setForEdit should set edit mode, selectedTodoId and formData', function() {

       var todo = {_id: 123, title: 'hello', notes: 'notey notey', done: true};
       vm.setForEdit(todo);

       expect(vm.editMode).toEqual('edit');
       expect(vm.selectedTodoId).toEqual(todo._id);
       expect(vm.formData.title).toEqual(todo.title);
       expect(vm.formData.notes).toEqual(todo.notes);
       expect(vm.formData.done).toEqual(todo.done);

    });


    it('clearForm should clear the form data', function() {
      var todo = {_id: 123, title: 'hello', notes: 'notey notey', done: true
        , dueDateTime: new Date()};
      vm.setForEdit(todo);
      vm.clearForm();
      expect(vm.formData.title).toEqual('');
      expect(vm.formData.notes).toEqual('');
      expect(vm.formData.done).toEqual(false);
      expect(vm.formData.dueDateTime).toEqual('');

    });


    it('deleteTodo should clear selectedTodoId and get latest todos', function() {
      var todo = vm.todos[0];
      vm.deleteTodo(todo._id);

      var invalid = vm.todos.filter(function(item){
        return item._id === todo._id;
      });

      expect(invalid.length > 0?invalid:null).toBeNull();

    });
    it('updateTodo should clear formData and selectedTodoId and get latest todos', function() {
      var todo = vm.todos[0];
      todo.title = 'updated todo';
      vm.updateTodo(todo);

      var updated = vm.todos.filter(function(item){
        return item._id === todo._id;
      });

      expect(updated.length).toEqual(1);
      expect(updated[0].title).toEqual(todo.title);
    });


    it('updateSelectedTodo should update selected todo', function() {
      var todo = vm.todos[0];
      angular.extend(todo,{_id: 123, title: 'hello', notes: 'notey notey', done: true});

      expect(todo.notes).toEqual('notey notey');

      vm.setForEdit(todo);
      vm.updateSelectedTodo();

      var updated = vm.todos.filter(function(item){
        return item._id === todo._id;
      });

      expect(updated.length).toEqual(1);
      expect(updated[0]._id).toEqual(todo._id);
      expect(updated[0].title).toEqual(todo.title);
      expect(updated[0].notes).toEqual(todo.notes);
      expect(updated[0].done).toEqual(todo.done);
    });


});
