(function (angular) {
  'use strict';

  angular
    .module('app')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',

        views: {
          'top-nav': {
            templateUrl: 'app/navbar.html'
          },
          'main-content': {
            templateUrl: 'app/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm'
          }
        }
      })
      .state('todo', {
        url: '/todo',
        views: {
          'top-nav': {
            templateUrl: 'app/navbar.html'
          },
          'main-content': {
            templateUrl: 'app/todo.html',
            controller: 'TodoCtrl',
            controllerAs: 'vm'
          }
        }
      });
  }
})(this.angular);
