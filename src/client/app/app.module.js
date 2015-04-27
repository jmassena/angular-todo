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


    angular.module('app')
      .directive('resetFormValidation', resetFormValidation);

    function resetFormValidation(){
      return{
        restrict: 'A'
        ,scope: {
          vm: '=scope' // 2 way binding
          ,reset: '=resetFormValidation'
        }

        ,link: function(scope, element, attrs){

          scope.$watch('reset', function(newVal, oldVal){

            if(newVal){
              // resolve form name in controller
              // i.e. form name is 'vm.myForm'
              var formName = element[0].name;
              var dotPath = formName.split('.');
              var target = scope;
              while(dotPath.length > 0){
                if(target.hasOwnProperty(dotPath[0])){
                  target = target[dotPath[0]];
                }
                else{break;}
                dotPath.shift();
              }

              if(!target){return;}

              target.$setUntouched();
              target.$setPristine();
              scope.reset = false;
            }
          });
        }
      };
    }

})(this.angular);
