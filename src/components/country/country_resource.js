angular.module('tnTour').factory('Country', function($resource){

  var countries = [];
  var observerCallbacks = [];

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

  Country.registerObserverCallback = function(callback){
    observerCallbacks.push(callback);
  };

  function notifyObservers(){
    angular.forEach(observerCallbacks, function(callback){ callback(); });
  };

  Country.all = function(){
    return countries;
  }

  Country.add = function(country){
    new Country(country).$save().then(function(result){
      angular.extend(country, result);
      countries.push(country);
      notifyObservers();
    });
  };

  //Country.destroy = function(country){
  //}

  //Country.update = function(country){
  //}

  return Country;
});
