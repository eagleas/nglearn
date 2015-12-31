angular.module('tnTour').factory('Hotel', function($resource){

  var hotels;

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
    var hotels = data.results;
    hotels.sort(function(a, b){ return a.name.localeCompare(b.name) });
    return hotels;
  }

  function init() {
    hotels = Hotel.query();
  }

  init();

  Hotel.all = function(){
    return hotels;
  }

  return Hotel;
});
