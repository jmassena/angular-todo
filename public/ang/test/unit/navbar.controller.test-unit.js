
describe('navbar controller: NavBarCtrl', function() {
  'use strict';

    var vm;

    beforeEach(module('app'));

    beforeEach(function(){

      module(function($provide){
        /* global mockNavData */
        $provide.factory('navDataService', mockNavDataService.get);
      });
    });

    beforeEach(inject(function(_$controller_, _$location_, _navDataService_){

      var controller = _$controller_;
      var location = _$location_;
      var navDataService = _navDataService_;

      vm = controller('NavBarCtrl', {$location: location, navDataService: navDataService});

    }));

    it('should set controller brand.text to "My Demo"', function() {
      expect(vm.brand.text).toEqual('My Demo');
    });

    it('should have 3 static tabs', function() {
      expect(vm.getStaticTabs().length).toEqual(3);
    });

    it('should have 2 dropdown tabs', function() {
      expect(vm.getDropdownTabsCount()).toEqual(2);
    });

});
