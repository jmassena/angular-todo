(function () {
    'use strict';

    angular
        .module('app')
        .factory('navDataFactory', navDataFactory);

    //dataservice.$inject = ['$http'];

    // services are 'new'ed
    // factory, provider are singletons
    function navDataFactory() {

      return {
        getMenu:getMenu
      };


      // static data for now but service decouples data from controller for now.
      // later we wil pass in $http so we can get this data from the database or file.
      function getMenu() {
        return {
          brand: {text: 'Justin\'s Demo', sref: 'home'},
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
    }
})();
