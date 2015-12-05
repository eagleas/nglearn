
angular.module('tnTour').controller('HomeController', function($scope, apiDataHelper, Tour, Country, Place){

  $scope.countries = Country.query();
  $scope.places = Place.query();
  $scope.tours = Tour.query();

});
