// public/ang/navbar.js


(function(angular) {
  'use strict';

  angular
      .module('app')
      .controller('TodoCtrl', TodoCtrl);


      function TodoCtrl(){

        // get todos from database for now person id is always 9999
        // we need a todo.service

        var vm = this;
        vm.title = 'To-Do Page';
      }

})(this.angular);
