angular.module('tnTour').factory('Place', function($resource, apiDataHelper){

  var places;
  var observerCallbacks = [];

  var Place = $resource(
    'https://api.parse.com/1/classes/Place/:objectId',
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
    places = Place.query();
  }

  init();

  Place.registerObserverCallback = function(callback){
    observerCallbacks.push(callback);
  };

  function notifyObservers(){
    angular.forEach(observerCallbacks, function(callback){ callback(); });
  };

  Place.all = function(){
    return places;
  }

  function extendPointers(place){
    angular.extend(place.country, apiDataHelper.extendPointer('Country'));
  };

  Place.add = function(place){
    extendPointers(place);
    new Place(place).$save().then(function(result){
      angular.extend(place, result);
      places.push(place);
      notifyObservers();
    });
  };

  Place.remove = function(place){
    new Place(place).$delete().then(function(result){
      var ids = places.map(function(obj){ return obj.objectId });
      var index = ids.indexOf(place.objectId);
      if (index > -1) {
        places.splice(index, 1);
      };
      notifyObservers();
    });
  };

  Place.store = function(place){
    extendPointers(place.draft);
    new Place(place.draft).$update().then(function(result){
      angular.copy(place.draft, place);
      notifyObservers();
    });
  };

  return Place;
});
