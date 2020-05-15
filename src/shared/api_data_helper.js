angular.module('tnTour').factory('apiDataHelper', function(_){
  return {
    createPointer: function(className, arr, objId){
      return {
        __type: 'Pointer',
        className: className,
        name: _.find(arr, 'objectId', objId).name
      }
    },
    extendPointer: function(className, objId){
      return {
        __type: 'Pointer',
        className: className,
      }
    }
  }
})


