'use strict';

module.exports = function ($stateProvider, $urlRouterProvider){

      $urlRouterProvider.otherwise('/home');

      $stateProvider
        .state('home', {
          url: '/home',

          views:{
            'top-nav':{
              templateUrl: 'templates/navbar.html'
            },
            'main-content': {
              templateUrl: 'templates/home.html',
              controller: 'HomeCtrl',
              controllerAs: 'vm'
            }
          }
        })
        .state('todo',{
          url: '/todo',
          views:{
            'top-nav':{
              templateUrl: 'templates/navbar.html'
            },
            'main-content': {
              templateUrl: 'templates/todo.html',
              controller: 'TodoCtrl',
              controllerAs: 'vm'
            }
          }
        })
        ;

};
