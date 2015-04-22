(function (angular) {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngResource', 'datetimepicker']);


    angular.module('app')
      .config([
          'datetimepickerProvider',
          function (datetimepickerProvider) {
              datetimepickerProvider.setOptions({
                  locale: 'en'
              });
          }
      ]);

})(this.angular);
