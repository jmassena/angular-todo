'use strict';
/* jshint camelcase:false */
/* global jQuery  */
/* global moment */
angular
  .module('datetimepicker', [])

  .provider('datetimepicker', function () {
    var default_options = {};

    this.setOptions = function (options) {
      default_options = options;
    };

    this.$get = function () {
      return {
        getOptions: function () {
          return default_options;
        }
      };
    };
  })

  .directive('datetimepicker', [
    '$timeout',
    'datetimepicker',
    function ($timeout,
              datetimepicker) {

      var default_options = datetimepicker.getOptions();

      return {
        require : '?ngModel',
        restrict: 'AE',
        scope   : {
          datetimepickerOptions: '@'
        },
        link    : function ($scope, $element, $attrs, ngModelCtrl) {
          var passed_in_options = $scope.$eval($attrs.datetimepickerOptions);
          var options = jQuery.extend({}, default_options, passed_in_options);

          // My modifications
          // Watch ng-model object value and when it changes update the picker value
          // otherwise input doesn't show ng-model value until it is selected by picker.
          if(ngModelCtrl){
            $scope.$watch(function(){return ngModelCtrl.$modelValue;}, function(newVal, oldVal){

              // compare new value to picker date
              // if different update picker
              if(Object.prototype.toString.call(newVal) === '[object String]' && newVal.length > 0
                || Object.prototype.toString.call(newVal) === '[object Date]'){

                  var n = moment(newVal);
                  var d = $element.data('date');
                  if(d != null && d.length > 0){
                    d = moment(d);
                  }

                  if(!n.isSame(d)){
                    $element.data('DateTimePicker').date(n);
                  }
              }
              else{
                if($element.data('date').length > 0){
                  $element.data('DateTimePicker').clear();
                }
              }
              //
              // if(newVal != oldVal){
              //   var dpc = $element.data('DateTimePicker');
              //   dpc.date(newVal);
              // }
            });
          }

          $element
            .on('dp.change', function (on_change_event) {
              if (ngModelCtrl) {
                $timeout(function () {
                  ngModelCtrl.$setViewValue(angular.copy(on_change_event.target.value));
                });
              }
            })
            .datetimepicker(options);
        }
      };
    }
  ]);
