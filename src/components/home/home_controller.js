
angular.module('tnTour').controller('HomeController', function($scope, apiDataHelper, Tour, Country, Place){

  $scope.countries = Country.all();
  $scope.places = Place.all();
  $scope.tours = Tour.all();

});
