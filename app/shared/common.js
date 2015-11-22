angular.module('shared', []).factory('common', function() {
  return {
    getName: function (array, objectId){
      return array.find(function(e){
        return e.objectId == objectId;
      }).name;
    }
  }
})
