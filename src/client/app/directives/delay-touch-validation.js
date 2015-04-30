// 'use strict';
//
// angular.module('app')
//   .directive('delayTouchValidation', ['$timeout', '$log', delayTouchValidation]);
//
//
//   function delayTouchValidation($timeout, $log){
//
//     return {
//       restrict: 'A',
//       scope: {
//         form: '@',
//         delay: '@delayTouchValidation',
//         delayClass: '@'
//       },
//       link: function(scope, element, attrs, ctrl){
//
//         scope.$watch(
//           // function(){return element[0].classList;},
//           function(){return attrs.class;},
//           function(newVal, oldVal){
//
//             var newList = newVal.split(' ');
//             var oldList = oldVal.split(' ');
//
//             var newTouched = $.inArray('ng-touched', newList);
//             var oldTouched = $.inArray('ng-touched', oldList);
//
//             if(newTouched === oldTouched){
//                 $log.info('no change');
//
//               return;
//             }
//             else if(newTouched){
//                 $log.info('adding scope');
//
//               // added ng-touched
//               // if(!newTouched.contains(scope.delayClass)){
//               //   $log.info('adding scope');
//               //
//               //   $timeout(function(){
//               //     element.classList.add(scope.delayClass);
//               //     $log.info('executing scope add');
//               //   },
//               //   scope.delay);
//               // }
//             }
//             else if(oldTouched){
//               // removed ng-touched
//               $log.info('removing scope');
//               //element.classList.remove(scope.delayClass);
//             }
//         });
//         // var formName = element[0].name;
//         // var dotPath = formName.split('.');
//         // var target = scope;
//         // while(dotPath.length > 0){
//         //   if(target.hasOwnProperty(dotPath[0])){
//         //     target = target[dotPath[0]];
//         //   }
//         //   else{break;}
//         //   dotPath.shift();
//         // }
//         //
//         // if(!target){return;}
//
//       }
//     };
//   }
