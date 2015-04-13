describe('Controller: HomeCtrl', function() {
  'use strict';

    var scope,
        log,
        ctrl;

    beforeEach(module('app'));

    // _$controller_ is just a service for getting a controller instance
    beforeEach(inject(function($controller, $log){

        log = $log;
        scope = {};
        ctrl = $controller('HomeCtrl', {$scope:scope});
    }));


    it('should set title to "Home Page"', function() {

      expect(ctrl.title).toEqual('Home Page');
    });

});
