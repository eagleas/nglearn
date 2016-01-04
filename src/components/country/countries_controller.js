
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
    new Country(country).$delete().then(
      function(){
        var index = $scope.countries.indexOf(country);
        if (index > -1) {
          $scope.countries.splice(index, 1);
        }
      }
    );
  }

  $scope.editCountry = function(country){
    var draft = angular.copy(country);
    country.draft = draft;
  }

  $scope.saveCountry = function(country){
    new Country(country.draft).$update().then( function(){
      angular.copy(country.draft, country);
    })
  }

  $scope.cancelEdit = function(country){
    delete country.draft;
  }

}]);
