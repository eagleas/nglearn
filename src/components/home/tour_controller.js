angular.module('tnTour').controller('TourController', function($scope, $routeParams, Tour){

  $scope.tour = Tour.get({objectId: $routeParams.objectId});

})
