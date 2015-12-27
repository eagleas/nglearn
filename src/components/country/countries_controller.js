
angular.module('tnTour').controller('CountriesController', ['$scope', 'Country', function($scope, Country){

  $scope.countries = Country.all();
  $scope.newCountry = null;

  function insertCountry(country){
    $scope.countries.push(country);
    $scope.countries.sort(function(a, b){ return a.name.localeCompare(b.name) });
  }

  $scope.addCountry = function(){
    new Country($scope.newCountry).$save().then(
      function(country){
        var countryFromServer = angular.extend(country, $scope.newCountry);
        insertCountry(countryFromServer);
        $scope.newCountry = null;
      }
    );
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
      $scope.countries.sort(function(a, b){ return a.name.localeCompare(b.name) });
    })
  }

  $scope.cancelEdit = function(country){
    delete country.draft;
  }

}]);
