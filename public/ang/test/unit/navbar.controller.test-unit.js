

var mockDataService = function(){
  'use strict';

  var service = {
      getMenu: getMenu
  };

  return service;

  // static data for now but service decouples data from controller for now.
  // later we wil pass in $http so we can get this data from the database or file.
  function getMenu() {
    return {
      brand: {text: 'My Demo', sref: 'home'},
      tabs: [
        {type: 'static', text: 'Home', sref: 'home', paths: ['/home']},
        {type: 'static', text: 'To Do', sref: 'todo', paths: ['/todo']},
        {type: 'static', text: 'About', sref: 'about', paths: ['/about']},

        {type: 'dropdown', text: 'Tech',
          items:[
            {type: 'header', text: 'Main'},
            {type: 'link', text: 'Bootstrap'},
            {type: 'link', text: 'AngularJS'},
            {type: 'link', text: 'NodeJS'},
            {type: 'link', text: 'Mongo'},
            {type: 'divider'},
            {type: 'header', text: 'Misc'},
            {type: 'link', text: 'Jasmine'},
            {type: 'link', text: 'Mocha'},
            {type: 'link', text: 'Karma'},
            {type: 'link', text: 'Protractor'},
            {type: 'link', text: 'Gulp'}
            ]}
      ]};

  }
};

describe('navbar controller: NavBarCtrl', function() {
  'use strict';

    var scope,
        location,
        controller,
        mockData,
        ctrl;

    beforeEach(module('app'));

    module(function($provide){
      $provide.service('dataService', mockDataService);
    });


    beforeEach(inject(function(_$controller_, _$location_, dataService){

        var location = _$location_;
        var controller = _$controller_;
        var mockData = dataService;
        scope = {};

        ctrl = controller('NavBarCtrl', {$scope:scope, $location: location, dataService:mockData});
    }));


    it('should set brand.text to "My Demo"', function() {

      expect(ctrl.brand.text).toEqual('My Demo');
      //expect(true).toEqual(false);
    });

});
