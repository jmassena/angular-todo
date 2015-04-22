describe('Controller: TodoCtrl', function() {
  'use strict';

    var scope,
        log,
        ctrl;

    beforeEach(module('app'));

    // _$controller_ is just a service for getting a controller instance
    beforeEach(inject(function($controller, $log){

        log = $log;
        scope = {};
        ctrl = $controller('TodoCtrl', {$scope:scope});
    }));


    // if I am using mock data then i should not be testing the data.
    // I should be testing the controller functionality.
    // such as clearForm() or ...
    // Does it update the vm.todoList after adding an item.
    xit('should clear the form data', function() {

      // expect(ctrl.title).toEqual('val');
    });


});
