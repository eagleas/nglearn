
angular.module('tnTour').controller('CountriesController', ['$scope', 'Country', function($scope, Country){

  $scope.countries = Country.all();
  $scope.newCountry = null;

  Country.registerObserverCallback(function(){
    $scope.countries = Country.all();
    $scope.$$phase || $scope.$digest();
  });

  $scope.addCountry = function(){
    Country.add($scope.newCountry);
    $scope.newCountry = null;
  }

  $scope.deleteCountry = function(country){
    Country.remove(country);
  }

  $scope.editCountry = function(country){
    var draft = angular.copy(country);
    country.draft = draft;
  }

  $scope.saveCountry = function(country){
    Country.store(country);
  }

  $scope.cancelEdit = function(country){
    delete country.draft;
  }

}]);
