angular.module('tnTour').factory('appHelper', function(){
  return {
    createPointer: function(className, arr, objId){
      return {
        __type: 'Pointer',
        className: className,
        name: _.find(arr, 'objectId', objId).name
      }
    }
  }
})


