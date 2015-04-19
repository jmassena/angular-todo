// server/common/dateUtils.js

'use strict';

// each module has its own scope so no need to do iife to create scope
module.exports =  {
    addDays: addDays
  };



function addDays(date, days){

  var newDate = new Date(date);
  newDate.setDate(newDate.getDate + days);
  return newDate;
}
