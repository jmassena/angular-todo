'use strict';

module.exports.provider = function () {
    var defaultOptions = {};

    this.setOptions = function (options) {
      defaultOptions = options;
    };

    this.$get = function () {
      return {
        getOptions: function () {
          return defaultOptions;
        }
      };
    };
};


module.exports.directive = function ($timeout,datetimepicker) {

// require('moment');
// require('eonasdan-bootstrap-datetimepicker');

  var defaultOptions = datetimepicker.getOptions();

  return {
    require : '?ngModel',
    restrict: 'AE',
    scope   : {
      datetimepickerOptions: '@'
    },
    link    : function ($scope, $element, $attrs, ngModelCtrl) {
      var passedInOptions = $scope.$eval($attrs.datetimepickerOptions);
      var options = jQuery.extend({}, defaultOptions, passedInOptions);

      // My modifications
      // Watch ng-model object value and when it changes update the picker value
      // otherwise input doesn't show ng-model value until it is selected by picker.
      if(ngModelCtrl){
        $scope.$watch(function(){return ngModelCtrl.$modelValue;}, function(newVal, oldVal){
          if(newVal != oldVal){
            var dpc = $element.data('DateTimePicker');
            dpc.date(newVal);
          }
        });
      }

      $element
        .on('dp.change', function (on_change_event) {
          if (ngModelCtrl) {
            $timeout(function () {
              ngModelCtrl.$setViewValue(on_change_event.target.value);
            });
          }
        })
        .datetimepicker(options);
    }
  };
};
