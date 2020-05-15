
angular.module('tnTour').controller('HotelsController', function($scope, $q, Hotel, Country, Place){

  $scope.countries = Country.all();
  $scope.places = Place.all();
  $scope.hotels = Hotel.all();

  // Заменить в турах в местах Pointer на Place значением из загруженных списков
  // Country добавить по значению в Place
  $q.all([$scope.hotels.$promise, $scope.countries.$promise, $scope.places.$promise]).then(function(){
    angular.forEach($scope.hotels, function(hotel){
      angular.extend(hotel.place, _.find($scope.places, 'objectId', hotel.place.objectId));
      hotel.country = {};
      angular.extend(hotel.country, _.find($scope.countries, 'objectId', hotel.place.country.objectId));
    });
  });

  $scope.hiddenForm = true;

  $scope.showForm = function(){
    $scope.newHotel = null;
    $scope.hiddenForm = false;
  }

  $scope.hideForm = function(){
    $scope.hiddenForm = true;
  }

  $scope.addHotel = function(newHotel){
    delete newHotel.country;
    Hotel.add(newHotel);
    $scope.hiddenForm = true;
  }

  $scope.deleteHotel = function(hotel){
    Hotel.remove(hotel);
  }

  $scope.editHotel = function(hotel){
    var draft = angular.copy(hotel);
    hotel.draft = draft;
    hotel.editMode = true;
  }

  $scope.saveHotel = function(hotel){
    Hotel.store(hotel);
    hotel.editMode = false;
  }

  $scope.cancelEdit = function(hotel){
    delete hotel.draft;
    delete hotel.editMode;
  }

});
