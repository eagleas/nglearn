
angular.module('tnTour').controller('HotelsController', function($scope, $q, $filter, apiDataHelper, Hotel, Country, Place){

  $scope.countries = Country.query();
  $scope.places = Place.query();
  $scope.hotels = Hotel.query();

  // Заменить в турах в местах Pointer на Place значением из загруженных списков
  // Country добавить по значению в Place
  $q.all([$scope.hotels.$promise, $scope.countries.$promise, $scope.places.$promise]).then(function(){
    angular.forEach($scope.hotels, function(item){
      item.place = $filter('filter')($scope.places, function(p){
        return p.objectId == item.place.objectId;
      })[0];
      item.country = $filter('filter')($scope.countries, function(c){
        return c.objectId == item.place.country.objectId;
      })[0];
    });
  });

  $scope.hiddenForm = true;

  function clearForm(){
    $scope.newHotel = emptyHotel()
  }

  $scope.showForm = function(){
    clearForm();
    $scope.hiddenForm = false;
  }

  $scope.hideForm = function(){
    $scope.hiddenForm = true;
  }

  function emptyHotel(){
    return {name: null, place: null};
  }

  clearForm();


  function addPointer(hotel){
    angular.extend(hotel.place,
      apiDataHelper.createPointer('Place', $scope.places, hotel.place.objectId));
  }

  $scope.addHotel = function(newHotel){
    addPointer(newHotel);
    new Hotel(newHotel).$save().then(
      function(hotel){
        var hotelFromServer = angular.extend(hotel, newHotel);
        $scope.hotels.push(hotelFromServer);
        $scope.hideForm();
        newHotel = emptyHotel();
      }
    );
  }

  $scope.deleteHotel = function(hotel){
    new Hotel(hotel).$delete().then(
      function(){
        var index = $scope.hotels.indexOf(hotel);
        if (index > -1) {
          $scope.hotels.splice(index, 1);
        }
      }
    );
  }

  $scope.editHotel = function(hotel){
    var draft = angular.copy(hotel);
    hotel.draft = draft;
    hotel.editMode = true;
  }

  $scope.saveHotel = function(hotel){
    addPointer(hotel.draft);
    new Hotel(hotel.draft).$update().then(
      function(){
        angular.copy(hotel.draft, hotel);
      }
    )
  }

  $scope.cancelEdit = function(hotel){
    delete hotel.draft;
    delete hotel.editMode;
  }

});
