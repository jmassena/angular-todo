// (function (angular) {
//     'use strict';
//
//     angular
//         .module('app')
//         .directive('modalDialog', modalDialog);
//
//
//     function modalDialog (){
//
//       return{
//         restrict: 'E',
//         scope: {
//           show: '='
//         },
//         replace: true, //replace element with below html
//         transclude: true, // insert element contents to our popup
//
//         link: function(scope, element, attrs){
//           scope.dialogStyle = {};
//           if(attrs.width){
//             scope.dialogStyle.width = attrs.width;
//           }
//           if(attrs.height){
//             scope.dialogStyle.height = attrs.height;
//           }
//
//           scope.hideModal = function(){
//             scope.show = false;
//           };
//         },
//         template: '' +
//           '<div class="ng-modal" ng-show="show">' +
//             '<div class="ng-modal-overlay" ng-click="hideModal()"></div>' +
//             '<div class="ng-modal-dialog" ng-style="dialogStyle">' +
//               '<div class="ng-modal-close" ng-click="hideModal()">X</div>' +
//               '<div class="ng-modal-dialog-content" ng-transclude></div>' +
//             '</div>' +
//           '</div>'
//         };
//     }
//
// })(this.angular);

//
// // in controller
//
// function toggleModal(){
//   vm.modalShown =  !vm.ModalShown;
// }
// vm.toggleModal = toggleModal;
//
//
// vm.modalShown = false;
//
// // in html
//
//   <button type="button" class="btn btn-primary" ng-click="vm.toggleModal()"  >Open Modal Dialog</button>
//
//   <modal-dialog show='vm.modalShown' width="500px" height="60%">
//     <p>Here is my message to you :)</p>
//   </modal-dialog>
