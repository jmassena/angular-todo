// public/ang/app.js


(function(angular) {
    'use strict';

    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl);


    /* @ngInject */
    //HomeCtrl.$inject = ['$scope', 'greeter'];
    function HomeCtrl(){
      var vm = this;
        vm.title = 'Home Page';
        //return vm;
    }


})(this.angular);
