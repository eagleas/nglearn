
angular.module('tnTour').controller('CountriesController', function($scope){

  $scope.countries = allCountries;
  $scope.newCountry = null;

  $scope.store = function(){
    $scope.countries.sort();
    localStorage.countries = JSON.stringify($scope.countries);
  }

  $scope.addCountry = function(newCountry){
    $scope.countries.push(angular.copy(newCountry));
    $scope.newCountry = null;
    $scope.store();
  }

  $scope.deleteCountry = function(country){
    var index = $scope.countries.indexOf(country);
    if (index > -1) {
      $scope.countries.splice(index, 1);
    }
    $scope.store();
  }

  $scope.editCountry = function(country){
    $scope.editMode = country;
    $scope.tmpEdit = country;
  }

  $scope.saveCountry = function(edit){
    var index = $scope.countries.indexOf($scope.editMode);
    if (index > -1) {
      $scope.countries[index] = angular.copy(edit);
    }
    $scope.editMode = null;
    $scope.store();
  }

  $scope.cancelEdit = function(){
    $scope.editMode = null;
    $scope.tmpEdit = null;
  }

});
