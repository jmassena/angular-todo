(function (angular) {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);


    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider){

      $urlRouterProvider.otherwise('/home');

      $stateProvider
        .state('home', {
          url: '/home',

          views:{
            'top-nav':{
              templateUrl: 'ang/navbar.html'
            },
            'main-content': {
              templateUrl: 'ang/home.html',
              controller: 'HomeCtrl',
              controllerAs: 'vm'
            }
          }
        })
        .state('todo',{
          url: '/todo',
          views:{
            'top-nav':{
              templateUrl: 'ang/navbar.html'
            },
            'main-content': {
              templateUrl: 'ang/todo.html',
              controller: 'TodoCtrl',
              controllerAs: 'vm'
            }
          }
        });
    }
})(this.angular);


//
// $stateProvider
//   .state('home', {
//     url: '/home',
//     templateUrl: 'ang/home.html',
//     controller: 'HomeCtrl',
//     controllerAs: 'vm'
//   })
//   .state('todo',{
//     url: '/todo',
//     templateUrl: 'ang/todo.html',
//     controller: 'TodoCtrl',
//     controllerAs: 'vm'
//   });
