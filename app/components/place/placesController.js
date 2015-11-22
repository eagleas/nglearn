
angular.module('tnTour').controller('PlacesController',
  ['$scope', 'common', 'Place', 'Country', function($scope, common, Place, Country){

  $scope.countries = Country.query();
  $scope.places = Place.query();
  $scope.newPlace = null;

  function extendPlace(place){
    angular.extend(place.country, {
      __type: 'Pointer',
      className: 'Country',
      name: common.getName($scope.countries, place.country.objectId),
    });
  }

  function insertPlace(place){
    $scope.places.push(place);
    $scope.places.sort(function(a, b){ return a.name.localeCompare(b.name) });
  }

  $scope.addPlace = function(){
    extendPlace($scope.newPlace);
    new Place($scope.newPlace).$save().then(
      function(place){
        var placeFromServer = angular.extend(place, $scope.newPlace);
        insertPlace(placeFromServer);
        $scope.newPlace = null;
      }
    );
  }

  $scope.deletePlace = function(place){
    new Place(place).$delete().then(
      function(){
        var index = $scope.places.indexOf(place);
        if (index > -1) {
          $scope.places.splice(index, 1);
        }
      }
    );
  }

  $scope.editPlace = function(place){
    var draft = angular.copy(place);
    place.draft = draft;
  }

  $scope.savePlace = function(place){
    extendPlace(place.draft);
    new Place(place.draft).$update().then( function(){
      angular.copy(place.draft, place);
      $scope.places.sort(function(a, b){ return a.name.localeCompare(b.name) });
    })
  }

  $scope.cancelEdit = function(place){
    place.draft = null;
  }

}]);
