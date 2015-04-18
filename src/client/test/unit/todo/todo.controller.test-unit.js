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


    xit('should show no todo items at start', function() {

      expect(ctrl.title).toEqual('val');
    });

    xit('should show one todo items after add', function() {

      expect(ctrl.title).toEqual('val');
    });

    xit('should show zero todo items after delete', function() {

      expect(ctrl.title).toEqual('val');
    });

    xit('should show zero todo items after delete', function() {

      expect(ctrl.title).toEqual('val');
    });

});
