angular.module('tnTour').factory('Hotel', function($resource, apiDataHelper){

  var hotels;
  var observerCallbacks = [];

  var Hotel = $resource(
    'https://api.parse.com/1/classes/Hotel/:objectId',
    { objectId: '@objectId'},
    {
      query: { isArray: true, transformResponse: parseResult },
      update: { method: 'PUT' }
    }
  )

  function parseResult(response){
    data = angular.fromJson(response);
    return data.results;
  }

  function init() {
    hotels = Hotel.query();
  }

  init();

  Hotel.registerObserverCallback = function(callback){
    observerCallbacks.push(callback);
  };

  function notifyObservers(){
    angular.forEach(observerCallbacks, function(callback){ callback(); });
  };

  Hotel.all = function(){
    return hotels;
  }

  function extendPointers(hotel){
    angular.extend(hotel.place, apiDataHelper.extendPointer('Place'));
  };

  Hotel.add = function(hotel){
    extendPointers(hotel);
    new Hotel(hotel).$save().then(function(result){
      angular.extend(hotel, result);
      hotels.push(hotel);
      notifyObservers();
    });
  };

  Hotel.remove = function(hotel){
    new Hotel(hotel).$delete().then(function(result){
      var ids = hotels.map(function(obj){ return obj.objectId });
      var index = ids.indexOf(hotel.objectId);
      if (index > -1) {
        hotels.splice(index, 1);
      };
      notifyObservers();
    });
  };

  Hotel.store = function(hotel){
    extendPointers(hotel.draft);
    new Hotel(hotel.draft).$update().then(function(result){
      angular.copy(hotel.draft, hotel);
      notifyObservers();
    });
  };

  return Hotel;
});
