// src/client/app/filters/date-order.filter.jse


(function (angular) {
    'use strict';

    angular
        .module('app')
        .filter('orderByDateTimeNullIsMax', dateTimeOrderSort);


    function dateTimeOrderSort(){

      return function(items, field, reverse){
        var filtered = [];

        angular.forEach(items, function(val){
          filtered.push(val);
        });

        filtered.sort(function(a, b){
          // need to return 0 when equal
          var aDate = dateGet(a[field]);
          var bDate = dateGet(b[field]);

          return (aDate > bDate) - (aDate < bDate);
        });

        if(reverse){
          filtered.reverse();
        }

        return filtered;
      };
    }


    function dateGet(a){

      if(a == null || a.length === 0){
        // min date value
        return new Date(8640000000000000);
      }
      else if(Object.prototype.toString.call(a) === '[object Date]'){
        return a;
      }
      else if(typeof(a) === "string" || a instanceof String){
        return new Date(a);
      }
      else{
        throw new Error('Unexpected value for date conversion. val: ' + JSON.stringify(a));
      }
    }

})(this.angular);
