/**
 * Calls form.$setUntouched() and $setPristine() when reset-form-validation attribute is true
 * Usage:
      Set the reset-form-validation and scope attributes.
      These are 2 way bindings so the reset-form-validation can be set to false
      after the form functions are called.
          <form
            name="vm.todoForm"
            reset-form-validation="vm.resetFormFlag"
            scope="vm">

 */

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
          target.$setUntouched();
          
          scope.reset = false;
        }
      });
    }
  };
}
