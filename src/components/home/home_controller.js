
angular.module('tnTour').controller('HomeController', function($q, $scope, Tour, Country, Place){

  $scope.countries = Country.all();
  $scope.places = Place.all();
  $scope.tours = Tour.all();

  $q.all([$scope.tours.$promise, $scope.countries.$promise, $scope.places.$promise]).then(function(){
    angular.forEach($scope.tours, function(tour){
      angular.extend(tour.country, _.find($scope.countries, 'objectId', tour.country.objectId));
      angular.extend(tour.place, _.find($scope.places, 'objectId', tour.place.objectId));
      angular.extend(tour.hotel, _.find($scope.hotels, 'objectId', tour.hotel.objectId));
    });
  });

});
