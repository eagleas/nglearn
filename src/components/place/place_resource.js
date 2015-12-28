angular.module('tnTour').factory('Place', function($resource){

  var places;

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
    var places = data.results;
    places.sort(function(a, b){ return a.name.localeCompare(b.name) });
    return places;
  }

  function init() {
    places = Place.query();
  }

  init();

  Place.all = function(){
    return places;
  }

  return Place;
});
