
angular.module('tnTour').controller('HotelsController',
  ['$scope', '$q', '$filter', 'common', 'Hotel', 'Country', 'Place', function($scope, $q, $filter, common, Hotel, Country, Place){

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
    return {title: null, country: null, price: null, duration: null, text: null};
  }

  clearForm();


  function extendHotel(hotel){
    angular.extend(hotel.place, {
      __type: 'Pointer',
      className: 'Place',
      name: common.getName($scope.places, hotel.place.objectId)
    });
  }

  $scope.addHotel = function(newHotel){
    extendHotel(newHotel);
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
    hotel.draft = angular.copy(hotel);
    hotel.editMode = true;
  }

  $scope.saveHotel = function(hotel){
    extendHotel(hotel.draft);
    new Hotel(hotel.draft).$update().then(
      function(){
        angular.copy(hotel.draft, hotel);
      }
    )
  }

  $scope.cancelEdit = function(hotel){
    hotel.editMode = false;
  }

}]);
