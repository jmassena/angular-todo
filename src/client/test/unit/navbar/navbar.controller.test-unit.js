describe('navbar controller: NavBarCtrl', function () {
  'use strict';

  beforeEach(module('app'));

  // beforeEach(function(){
  //
  //   module(function($provide){
  //     /* global mockNavDataService */
  //     $provide.factory('navDataService', mockNavDataService.get);
  //   });
  // });

  var vm;

  beforeEach(inject(function (_$controller_, _$location_) {

    var controller = _$controller_;
    var location = _$location_;
    /* global mockNavDataService */
    vm = controller('NavBarCtrl', {
      $location: location,
      navDataService: mockNavDataService.get()
    });

  }));

  it('controller should exist', function () {
    expect(vm).toBeDefined();
  });

  it('should set controller brand.text to "My Demo"', function () {
    expect(vm.brand.text).toEqual('My Demo');
  });

  it('should have 3 static tabs', function () {
    expect(vm.getStaticTabs().length).toEqual(3);
  });

  it('should have 2 dropdown tabs', function () {
    expect(vm.getDropdownTabsCount()).toEqual(2);
  });

});
