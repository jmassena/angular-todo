/**
 * A generic confirmation for risky actions.
 * Usage: Add attributes: ng-really-message="Are you sure"? ng-really-click="takeAction()" function
 */
angular.module('app').directive('ngReallyClick', [function() {
  'use strict';
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                var message = attrs.ngReallyMessage;
                if (message && confirm(message)) {
                    scope.$apply(attrs.ngReallyClick);
                }
            });
        }
    };
}]);

// 
// <a ng-really-message="Delete this todo?" ng-really-click="deleteTodo(todo._id)" href="#">
//   <span class="glyphicon glyphicon-remove color-delete"></span>
// </a>
