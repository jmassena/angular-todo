// public/ang/app.js


(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl)
        .controller('TodoCtrl', TodoCtrl);


    /* @ngInject */
    //HomeCtrl.$inject = ['$scope', 'greeter'];
    function HomeCtrl(){
      var vm = this;
        vm.title = 'Home Page';
        //return vm;
    }

    //TodoCtrl.$inject = ['$scope', 'greeter'];
    function TodoCtrl(){
      var vm = this;
      vm.title = 'To-Do Page';
      //return vm;
    }
})();

//
//
// // (function(){
//
//     var app = angular.module('myApp', [
//       'ui.router'
//     ]);
//
//     app.controller('homeCtrl', function(){
//       var vm = this;
//       vm.title = 'Home';
//     });
//
//     app.controller('todoCtrl', function(){
//       var vm = this;
//       vm.title = 'To Do';
//     });
//
//     app.config(['$stateProvider', '$urlRouterProvider',
//       function($stateProvider, $urlRouterProvider){
//
//         $urlRouterProvider.otherwise('/home');
//
//         $stateProvider
//           .state('home', {
//             url: '/home',
//             templateUrl: 'ang/home.html',
//             controller: 'homeCtrl',
//             controllerAs: 'vm'
//           })
//           .state('todo',{
//             url: '/todo',
//             templateUrl: 'ang/todo.html',
//             controller: 'todoCtrl',
//             controllerAs: 'vm'
//           })
//     }]);




    //app.config(appConfig);

    // app.controller('homeCtrl' function(){
    //
    // });

    //app.controller('todoCtrl' todoController);


    // appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    // function appConfig($stateProvider, $urlRouterProvider){
    //
    //   // unmatched routes redirect to home page
    //   $urlRouterProvider.otherwise('/home');
    //
    //   $stateProvider
    //     .state('home', {
    //       url: '/home',
    //       templateUrl: 'ang/home.html',
    //       controller: 'homeCtrl'
    //     })
    //     .state('todo',{
    //       url: '/todo',
    //       templateUrl: 'ang/todo.html',
    //       controller: 'todoCtrl'
    //     })
    //
    // }

    // //homeController.$inject = ['$scope', 'greeter'];
    // function homeController(){
    //   var vm = this;
    //     vm.title = 'Home Page';
    // }

    // //todoController.$inject = ['$scope', 'greeter'];
    // function todoController(){
    //   var vm = this;
    //   vm.title = 'To-Do Page';
    // }
//
// })();
