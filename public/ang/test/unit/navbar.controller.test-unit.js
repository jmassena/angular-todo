


// var mockDataService = {};
// mockDataService.getMenu = function(){
//   return {brand:{
//       text:'My Demo'}
//     };
// }


// var mockDataService = function(){
//
//   this.getMenu = function(){
//     return {brand:{
//         text:'My Demo'}
//       };
//   }
// }


describe('navbar controller: NavBarCtrl', function() {
  'use strict';


  var mockDataService = function(){

    var serviceApi = {
        getMenu: getMenu
    };

    return serviceApi;

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

    var ctrl;

    beforeEach(module('app'));

    beforeEach(function(){

      module(function($provide){
        $provide.service('dataService', mockDataService);
      });
    });

    beforeEach(inject(function(_$controller_, _$location_, _dataService_){

        var location = _$location_;
        var controller = _$controller_;
        var mockData = _dataService_;

        ctrl = controller('NavBarCtrl', {$location: location, dataService:mockData});
    }));


    it('should set brand.text to "My Demo"', function() {

      expect(ctrl.brand.text).toEqual('My Demo');
    });

});
