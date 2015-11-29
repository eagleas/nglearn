angular.module('tnTour').factory('apiDataHelper', function(){
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


