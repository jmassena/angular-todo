// public/ang/navbar.js


(function(angular) {
  'use strict';

  angular
      .module('app')
      .controller('NavBarCtrl', NavBarCtrl);

  var navStates = [];
  navStates.push({title: 'Home', sref: 'home', paths: ['/home']});
  navStates.push({title: 'To Do', sref: 'todo', paths: ['/todo']});
  navStates.push({title: 'About', sref: 'about', paths: ['/about']});

  /* @ngInject */

  NavBarCtrl.$inject = ['$location',];
  function NavBarCtrl($location){
    var vm = this;

    vm.states = navStates;
    vm.isSelected = isSelected;
    vm.test =  'helllo';

    function isSelected(sref){

      var path = $location.path().toLowerCase() || '/home';

      if(path.indexOf(sref) === 1){
        return true;
      }

      return false;
    }

  }

})(this.angular);
