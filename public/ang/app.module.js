(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(routeConfig);


    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider){

      $urlRouterProvider.otherwise('/home');

      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'ang/home.html',
          controller: 'HomeCtrl',
          controllerAs: 'vm'
        })
        .state('todo',{
          url: '/todo',
          templateUrl: 'ang/todo.html',
          controller: 'TodoCtrl',
          controllerAs: 'vm'
        });
    }
})();
