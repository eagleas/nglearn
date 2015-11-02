
angular.module('tnTour').controller('CountriesController', function($scope){

  $scope.countries = allCountries;
  $scope.newCountry = null;

  function store(){
    $scope.countries.sort();
    localStorage.countries = JSON.stringify($scope.countries);
  }

  $scope.addCountry = function(newCountry){
    $scope.countries.push(angular.copy(newCountry));
    $scope.newCountry = null;
    store();
  }

  $scope.deleteCountry = function(country){
    var index = $scope.countries.indexOf(country);
    if (index > -1) {
      $scope.countries.splice(index, 1);
    }
    store();
  }

  $scope.editCountry = function(country){
    $scope.edit = {
      draft: angular.copy(country),
      backup: angular.copy(country)
    };
  }

  $scope.saveCountry = function(){
    var index = $scope.countries.indexOf($scope.edit.backup);
    if (index > -1) {
      $scope.countries[index] = angular.copy($scope.edit.draft);
    }
    $scope.edit.backup = null;
    store();
  }

  $scope.cancelEdit = function(){
    $scope.edit.backup = null;
  }

});
