(function () {
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
            'topnav':{
              templateUrl: 'ang/navbar.html'
            },
            'main-content': {
              templateUrl: 'ang/home.html',
              controller: 'HomeCtrl',
              controllerAs: 'vm',
            }
          }
        })
        .state('todo',{
          url: '/todo',
          templateUrl: 'ang/todo.html',
          controller: 'TodoCtrl',
          controllerAs: 'vm'
        });
    }
})();


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
