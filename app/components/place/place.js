angular.module('tnTour')
  .provider('Place', function(){

    this.$get = ['$resource', function($resource){
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

      return Place;
    }];

  });
