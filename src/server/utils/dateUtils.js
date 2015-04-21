
module.exports = function(){
  'use strict';

  return{
    addDays: addDays
  };

  function addDays(date, days){

    var newDate = new Date(date);
    newDate.setDate(newDate.getDate + days);
    return newDate;
  }
};
