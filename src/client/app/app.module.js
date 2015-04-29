'use strict';

require('angular');
require('angular-ui-router');
require('angular-resource');

// require('moment');


angular
  .module('app', [
    'ui.router',
    'ngResource',
    'datetimepicker']
  )
  .config([
      'datetimepickerProvider',
      function (datetimepickerProvider) {
          datetimepickerProvider.setOptions({
              locale: 'en'
          });
      }
  ])
  .config(['$stateProvider', '$urlRouterProvider',require('./app.routes.js')])


  .directive('resetFormValidation',require('./directives/form-validation-reset.directive.js'))

  .controller('HomeCtrl', require('./home.controller.js'))
  .controller('NavBarCtrl', ['$location','navDataService', require('./navbar.controller.js')])
  .controller('TodoCtrl', ['todoService','$log', require('./todo.controller.js')])

  .factory('navDataService', require('./nav-data.service'))
  .factory('todoService', ['$http', '$q', '$log', require('./todo.service.js')]);


  // not sure if this needs to be a separate module
  angular.module('datetimepicker', [])
  .provider('datetimepicker', require('./directives/datetimepicker.directive.js').provider)
  .directive('datetimepicker', ['$timeout','datetimepicker', require('./directives/datetimepicker.directive.js').directive]);

  // // angular
  // //   .module('datetimepicker', [])
  //   //.provider('datetimepicker', function () {
  //
  //   .directive('datetimepicker', [
  //     '$timeout',
  //     'datetimepicker',
  //
