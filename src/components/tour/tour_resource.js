angular.module('tnTour').factory('Tour', function($resource, apiDataHelper){

  // TO ASK: Как заинжектировать lodash _ в фабрику?

  var tours;
  var observerCallbacks = [];

  var Tour = $resource(
    'https://api.parse.com/1/classes/Tour/:objectId',
    { objectId: '@objectId' },
    {
      query: { isArray: true, transformResponse: parseResult },
      update: { method: 'PUT' }
    }
  )

  function parseResult(response){
    data = angular.fromJson(response);
    return data.results;
  }

  function init(){
    tours = Tour.query();
  };

  init();

  Tour.registerObserverCallback = function(callback){
    observerCallbacks.push(callback);
  };

  function notifyObservers(){
    angular.forEach(observerCallbacks, function(callback){ callback(); });
  };

  Tour.all = function(){
    return tours;
  };

  function extendPointers(tour){
    angular.extend(tour.country, apiDataHelper.extendPointer('Country'));
    angular.extend(tour.place, apiDataHelper.extendPointer('Place'));
    angular.extend(tour.hotel, apiDataHelper.extendPointer('Hotel'));
  };

  Tour.add = function(tour){
    extendPointers(tour);
    new Tour(tour).$save().then(function(result){
      angular.extend(tour, result);
      tours.push(tour);
      notifyObservers();
    });
  };

  Tour.remove = function(tour){
    new Tour(tour).$delete().then(function(result){
      var ids = tours.map(function(obj){ return obj.objectId });
      var index = ids.indexOf(tour.objectId);
      if (index > -1) {
        tours.splice(index, 1);
      };
      notifyObservers();
    });
  };

  Tour.store = function(tour){
    new Tour(tour.draft).$update().then(function(result){
      angular.copy(tour.draft, tour);
      notifyObservers();
    });
  };

  return Tour;
});
