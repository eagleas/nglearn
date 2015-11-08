
angular.module('tnTour').controller('PlacesController', ['$scope', 'Place', function($scope, Place){

  $scope.countries = Place.query();
  $scope.newPlace = null;

  function insertPlace(place){
    $scope.countries.push(place);
    $scope.countries.sort(function(a, b){ return a.name.localeCompare(b.name) });
  }

  $scope.addPlace = function(){
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
        var index = $scope.countries.indexOf(place);
        if (index > -1) {
          $scope.countries.splice(index, 1);
        }
      }
    );
  }

  $scope.editPlace = function(place){
    var draft = angular.copy(place);
    place.draft = draft;
  }

  $scope.savePlace = function(place){
    new Place(place.draft).$update().then( function(){
      angular.copy(place.draft, place);
      $scope.countries.sort(function(a, b){ return a.name.localeCompare(b.name) });
    })
  }

  $scope.cancelEdit = function(place){
    place.draft = null;
  }

}]);
