angular.module('tnTour').factory('Country', function($resource){

  var countries = []

  var Country = $resource(
    'https://api.parse.com/1/classes/Country/:objectId',
    { objectId: '@objectId'},
    {
      query: { isArray: true, transformResponse: parseResult },
      update: { method: 'PUT' }
    }
  )

  function parseResult(response){
    data = angular.fromJson(response);
    var countries = data.results;
    countries.sort(function(a, b){ return a.name.localeCompare(b.name) });
    return countries;
  }

  function init() {
    countries = Country.query();
  }

  init();

  Country.all = function(){
    return countries;
  }

  //Country.add = function(country){
  //}

  //Country.destroy = function(country){
  //}

  //Country.update = function(country){
  //}

  return Country;
});
