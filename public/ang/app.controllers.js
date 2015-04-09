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
