angular.module('tnTour').controller('TourController', ["$scope", "$routeParams", "Tour", function($scope, $routeParams, Tour){

  $scope.tour = Tour.get({objectId: $routeParams.objectId});

}])
