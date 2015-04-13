// public/ang/navbar.js


(function(angular) {
  'use strict';

  angular
      .module('app')
      .controller('NavBarCtrl', NavBarCtrl);


  // var navData = {
  //   brand: {text: 'Justin\'s Demo', sref: 'home'},
  //   tabs: [
  //     {type: 'static', text: 'Home', sref: 'home', paths: ['/home']},
  //     {type: 'static', text: 'To Do', sref: 'todo', paths: ['/todo']},
  //     {type: 'static', text: 'About', sref: 'about', paths: ['/about']},
  //
  //     {type: 'dropdown', text: 'Tech',
  //       items:[
  //         {type: 'header', text: 'Main'},
  //         {type: 'link', text: 'Bootstrap'},
  //         {type: 'link', text: 'AngularJS'},
  //         {type: 'link', text: 'NodeJS'},
  //         {type: 'link', text: 'Mongo'},
  //         {type: 'divider'},
  //         {type: 'header', text: 'Misc'},
  //         {type: 'link', text: 'Jasmine'},
  //         {type: 'link', text: 'Mocha'},
  //         {type: 'link', text: 'Karma'},
  //         {type: 'link', text: 'Protractor'},
  //         {type: 'link', text: 'Gulp'}
  //         ]}
  //   ]};


  /* @ngInject */

  NavBarCtrl.$inject = ['$location','dataService'];
  function NavBarCtrl($location, dataService){

    var vm = this;
    // TODO: add navData directly to vm.data property.
    // Not sure about this, I want a chance to expose data as I choose.
    var navData = dataService.getMenu();
    vm.brand = navData.brand;
    vm.tabs = navData.tabs;
    vm.isSelected = isSelected;
    vm.getStaticTabs = getStaticTabs;
    vm.getDropdownTabs = getDropdownTabs;
    vm.getDropdownTabsCount = getDropdownTabsCount;


    function isSelected(tab){

      var path = $location.path().toLowerCase() || '/home';

      if(path.indexOf(tab.sref) === 1){
        return true;
      }

      return false;
    }

    function getStaticTabs(){
      var ret = vm.tabs.filter(function(item){
        return item.type === 'static';
      });

      return ret;
    }

    function getDropdownTabs(){
      var ret = vm.tabs.filter(function(item){
        return item.type === 'dropdown';
      });

      return ret;
    }

    function getDropdownTabsCount(){
      var len =  getDropdownTabs().length;
      return len;
    }
  }

})(this.angular);

//
// <a href="#" class="dropdown-toggle" data-toggle="dropdown">
//   <!-- not sure what caret is doing here -->
//   <!-- !! it is the down arrow symbol :) -->
//   Tech <b class="caret"></b>
// </a>
// <ul class="dropdown-menu">
//   <li class="dropdown-header">Main</li>
//   <li><a href="#">Bootstrap</a></li>
//   <li><a href="#">AngularJS</a></li>
//   <li><a href="#">NodeJS</a></li>
//   <li><a href="#">Mongo</a></li>
//   <li class="divider"><li>
//     <li class="dropdown-header">Misc</li>
//   <li><a href="#">Jasmine</a></li>
//   <li><a href="#">Mocha</a></li>
//   <li><a href="#">Karma</a></li>
//   <li><a href="#">Protractor</a></li>
//   <li><a href="#">Grunt/Grub</a></li>
// </ul>
