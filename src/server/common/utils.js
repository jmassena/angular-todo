// server/common/utils.js


'use strict';

module.exports = {
  cloneDeep: cloneDeep
  };


function cloneDeep(obj){
  return JSON.parse(JSON.stringify(obj));
}
