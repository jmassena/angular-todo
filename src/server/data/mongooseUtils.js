// server/data/mongooseUtils.js

module.exports = (function (){
  'use strict';

  return{
    copyFieldsToModel: copyFieldsToModel
  };

  function copyFieldsToModel(source, target){

    for(var prop in source){
      if(prop !== '_id' && prop !== '__v' && source.hasOwnProperty(prop)){
        target[prop] = source[prop];
      }
    }
  }

}());
