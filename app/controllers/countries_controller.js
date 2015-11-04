
angular.module('tnTour').controller('CountriesController', ['$scope', 'Country', function($scope, Country){

  $scope.countries = Country.query();
  $scope.newCountry = null;

  function insertCountry(country){
    $scope.countries.push(country);
    $scope.countries.sort(function(a, b){ return a.name.localeCompare(b.name) });
  }

  $scope.addCountry = function(){
    var countryToServer = new Country($scope.newCountry);
    countryToServer.$save().then(
      function(country){
        var countryFromServer = angular.extend(country, $scope.newCountry);
        insertCountry(countryFromServer);
        $scope.newCountry = null;
      }
    );
  }

  $scope.deleteCountry = function(country){
    var countryToDelete = new Country(country)
    countryToDelete.$delete().then(
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
    var countryToServer = new Country(country.draft);
    countryToServer.$update().then( function(){
      angular.copy(country.draft, country);
    })
  }

  $scope.cancelEdit = function(country){
    country.draft = null;
  }

}]);
