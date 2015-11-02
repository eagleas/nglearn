
angular.module('tnTour').controller('CountriesController', function($scope){

  $scope.countries = allCountries;
  $scope.newCountry = null;

  $scope.addCountry = function(newCountry){
    $scope.countries.push(angular.copy(newCountry));
    $scope.newCountry = null;
    localStorage.countries = JSON.stringify($scope.countries);
  }

  $scope.deleteCountry = function(country){
    var index = $scope.countries.indexOf(country);
    if (index > -1) {
      $scope.countries.splice(index, 1);
    }
    localStorage.countries = JSON.stringify($scope.countries);
  }

  $scope.editCountry = function(country){
    $scope.editMode = country;
    $scope.tmpEdit = angular.copy(country);
  }

  $scope.saveCountry = function(edit){
    var index = $scope.countries.indexOf($scope.editMode);
    if (index > -1) {
      $scope.countries[index] = angular.copy(edit);
    }
    $scope.editMode = null;
    localStorage.countries = JSON.stringify($scope.countries);
  }

  $scope.cancelEdit = function(){
    $scope.editMode = null;
    $scope.tmpEdit = null;
  }

});
