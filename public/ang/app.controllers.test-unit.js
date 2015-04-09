describe('Controller: HomeCtrl', function() {

    var scope, log, ctrl;

    beforeEach(module('app'));

    // _$controller_ is just a service for getting a controller instance
    beforeEach(inject(function($controller, $log){

        // create controller instance with input scope
        log = $log;
        scope = {};
        ctrl = $controller('HomeCtrl', {$scope:scope});
    }));

    it('should set title to "Home Page"', function() {
      //log.info(JSON.stringify(ctrl));
      // console.log(ctrl);
      expect(ctrl.title).toEqual('Home Page');
    });

});
