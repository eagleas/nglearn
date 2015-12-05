
angular.module('tnTour').controller('HomeController', function($scope, apiDataHelper, Tour, Country, Place){

  $scope.testVar = 'passed';

  $scope.countries = Country.query();
  $scope.places = Place.query();
  $scope.tours = Tour.query();

});
