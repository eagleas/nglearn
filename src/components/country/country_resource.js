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
    return data.results;
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

  Country.remove = function(country){
    new Country(country).$delete().then(function(result){
      var ids = countries.map(function(obj){ return obj.objectId });
      var index = ids.indexOf(country.objectId);
      if (index > -1) {
        countries.splice(index, 1);
      };
      notifyObservers();
    });
  };

  Country.store = function(country){
    new Country(country.draft).$update().then(function(result){
      angular.copy(country.draft, country);
      notifyObservers();
    });
  };

  return Country;
});
