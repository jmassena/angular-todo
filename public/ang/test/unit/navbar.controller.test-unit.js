
describe('navbar controller: NavBarCtrl', function() {
  'use strict';

    var vm;

    beforeEach(module('app'));

    beforeEach(function(){

      module(function($provide){
        /* global mockNavData */
        $provide.factory('navDataFactory', mockNavData.get);
      });
    });

    beforeEach(inject(function(_$controller_, _$location_, _navDataFactory_){

      var controller = _$controller_;
      var location = _$location_;
      var navDataFactory = _navDataFactory_;

      vm = controller('NavBarCtrl', {$location: location, navDataFactory: navDataFactory});

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
