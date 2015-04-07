// public/ang/app.js


// (function(){

    var app = angular.module('myApp', [
      'ui.router'
    ])
    .controller('homeCtrl', function(){
      var vm = this;
      vm.title = 'Home';
    })
    .controller('todoCtrl', function(){
      var vm = this;
      vm.title = 'To Do';
    })
    .config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise('/home');

        $stateProvider
          .state('home', {
            url: '/home',
            templateUrl: 'ang/home.html',
            controller: 'homeCtrl',
            controllerAs: 'vm'
          })
          .state('todo',{
            url: '/todo',
            templateUrl: 'ang/todo.html',
            controller: 'todoCtrl',
            controllerAs: 'vm'
          })
    }]);

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
