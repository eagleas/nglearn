describe('TourController', function(){
  beforeEach(module('tnTour'));

  var Country;
  var APIurl = "https://api.parse.com/1/classes/Country";
  var $httpBackend;

  beforeEach(inject(function(_Country_, _$httpBackend_){
    Country = _Country_;
    $httpBackend = _$httpBackend_;
  }));

  describe('initialize', function(){
    it('expect call to parse.com', function(){
      $httpBackend.expectGET(APIurl).respond(200);
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });
    it('parse results', function(){
      var andorra = { objectId: 'a1', name: 'Andorra' };
      var cuba = { objectId: 'b1', name: 'Cuba' };
      var response = { results: [andorra, cuba] };
      $httpBackend.expectGET(APIurl).respond(200, response);
      $httpBackend.flush();
      expect(Country.all().length).toBe(2);
      expect(Country.all()[0].name).toBe(andorra.name);
    });
  });

  describe('functions', function(){
    it('add country', function(){
      $httpBackend.whenGET(APIurl).respond(200, { results: []});
      var objId = 'c1';
      $httpBackend.expectPOST(APIurl).respond(201, { objectId: objId });
      var country = { name: 'Argentina' };
      Country.add(country);
      $httpBackend.flush();
      expect(Country.all().length).toBe(1);
      expect(Country.all()[0].objectId).toBe(objId);
      expect(Country.all()[0].name).toBe(country.name);
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('remove country', function(){
      var country = { objectId: 't1', name: 'Country1' };
      $httpBackend.whenGET(APIurl).respond(200, { results: [country] });
      $httpBackend.flush();
      expect(Country.all().length).toBe(1);
      $httpBackend.expectDELETE(APIurl+'/'+country.objectId).respond(200);
      Country.remove(country);
      $httpBackend.flush();
      expect(Country.all().length).toBe(0);
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('store country', function(){
      var country = { objectId: 't1', name: 'Country1' };
      $httpBackend.whenGET(APIurl).respond(200, { results: [country] });
      var draft_title = 'a New country';
      var draft = angular.copy(country);
      draft.title = draft_title;
      country.draft = draft;
      $httpBackend.expectPUT(APIurl+'/'+country.objectId).respond(200, {results: [draft]});
      Country.store(country);
      $httpBackend.flush();
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });
  });

});
