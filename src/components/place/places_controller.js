
angular.module('tnTour').controller('PlacesController', function($q, $scope, apiDataHelper, Place, Country){

  $scope.countries = Country.all();
  $scope.places = Place.all();
  $scope.newPlace = null;

  $q.all([$scope.countries.$promise, $scope.places.$promise]).then(function(){
    angular.forEach($scope.places, function(place){
      angular.extend(place.country, _.find($scope.countries, 'objectId', place.country.objectId));
    });
  });

  function insertPlace(place){
    $scope.places.push(place);
    $scope.places.sort(function(a, b){ return a.name.localeCompare(b.name) });
  }

  $scope.addPlace = function(){
    Place.add($scope.newPlace);
    $scope.newPlace = null;
  }

  $scope.deletePlace = function(place){
    Place.remove(place);
  }

  $scope.editPlace = function(place){
    var draft = angular.copy(place);
    place.draft = draft;
  }

  $scope.savePlace = function(place){
    Place.store(place);
  }

  $scope.cancelEdit = function(place){
    delete place.draft;
  }

});
