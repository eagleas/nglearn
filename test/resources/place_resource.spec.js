describe('TourController', function(){
  beforeEach(module('tnTour'));

  var Place;
  var APIurl = "https://api.parse.com/1/classes/Place";
  var $httpBackend;

  beforeEach(inject(function(_Place_, _$httpBackend_){
    Place = _Place_;
    $httpBackend = _$httpBackend_;
  }));

  describe('initialize', function(){
    it('expect call to parse.com', function(){
      $httpBackend.expectGET(APIurl).respond(200);
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });
    it('parse results', function(){
      var place1 = { objectId: 'a1', name: 'Place1' };
      var place2 = { objectId: 'b1', name: 'Place2' };
      var response = { results: [place1, place2] };
      $httpBackend.expectGET(APIurl).respond(200, response);
      $httpBackend.flush();
      expect(Place.all().length).toBe(2);
      expect(Place.all()[0].name).toBe(place1.name);
    });
  });

  describe('functions', function(){
    it('add place', function(){
      $httpBackend.whenGET(APIurl).respond(200, { results: []});
      var objId = 'p1';
      $httpBackend.expectPOST(APIurl).respond(201, { objectId: objId });
      var place = { name: 'Place1', country: {objectId: 'c1', name: 'Country1'} };
      Place.add(place);
      $httpBackend.flush();
      expect(Place.all().length).toBe(1);
      expect(Place.all()[0].objectId).toBe(objId);
      expect(Place.all()[0].name).toBe(place.name);
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('remove place', function(){
      var place = { objectId: 'p1', name: 'Place1' };
      $httpBackend.whenGET(APIurl).respond(200, { results: [place] });
      $httpBackend.flush();
      expect(Place.all().length).toBe(1);
      $httpBackend.expectDELETE(APIurl+'/'+place.objectId).respond(200);
      Place.remove(place);
      $httpBackend.flush();
      expect(Place.all().length).toBe(0);
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('store place', function(){
      var place = { objectId: 'p1', name: 'Place1', country: {objectId: 'c1', name: 'Country1'} };
      $httpBackend.whenGET(APIurl).respond(200, { results: [place] });
      var draft_title = 'a New place';
      var draft = angular.copy(place);
      draft.title = draft_title;
      place.draft = draft;
      $httpBackend.expectPUT(APIurl+'/'+place.objectId).respond(200, {results: [draft]});
      Place.store(place);
      $httpBackend.flush();
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });
  });

});
