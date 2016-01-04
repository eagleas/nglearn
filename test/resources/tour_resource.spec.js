describe('TourController', function(){
  beforeEach(module('tnTour'));

  var Tour;
  var APIurl = "https://api.parse.com/1/classes/Tour";
  var $httpBackend;

  beforeEach(inject(function(_Tour_, _$httpBackend_){
    Tour = _Tour_;
    $httpBackend = _$httpBackend_;
  }));

  describe('initialize', function(){
    it('expect call to parse.com', function(){
      $httpBackend.expectGET(APIurl).respond(200);
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });
    it('parse and sort results', function(){
      var tour1 = { objectId: 'a1', title: 'Tour 1' };
      var tour2 = { objectId: 'b1', title: 'Tour 2' };
      var response = { results: [tour1, tour2] };
      $httpBackend.expectGET(APIurl).respond(200, response);
      $httpBackend.flush();
      expect(Tour.all().length).toBe(2);
      expect(Tour.all()[0].title).toBe(tour1.title);
    });
  });

  describe('functions', function(){
    it('add tour', function(){
      $httpBackend.whenGET(APIurl).respond(200, { results: []});
      var objId = 't1';
      $httpBackend.expectPOST(APIurl).respond(201, { objectId: objId });
      var tour = { title: 'Tour 1', country: {objectId: 'c1'}, place: {objectId: 'p1'}, hotel: {objectId: 'h1'}};
      Tour.add(tour);
      $httpBackend.flush();
      expect(Tour.all().length).toBe(1);
      expect(Tour.all()[0].objectId).toBe(objId);
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('remove tour', function(){
      var tour = { objectId: 't1', title: 'Tour 1', country: 'c1', place: 'p1', hotel: 'h1' };
      $httpBackend.whenGET(APIurl).respond(200, { results: [tour] });
      $httpBackend.flush();
      expect(Tour.all().length).toBe(1);
      $httpBackend.expectDELETE(APIurl+'/'+tour.objectId).respond(200);
      Tour.remove(tour);
      $httpBackend.flush();
      expect(Tour.all().length).toBe(0);
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('store tour', function(){
      var tour = { objectId: 't1', title: 'Tour1', country: 'c1', place: 'p1', hotel: 'h1' };
      $httpBackend.whenGET(APIurl).respond(200, { results: [tour] });
      var draft_title = 'a New tour';
      var draft = angular.copy(tour);
      draft.title = draft_title;
      tour.draft = draft;
      $httpBackend.expectPUT(APIurl+'/'+tour.objectId).respond(200, {results: [draft]});
      Tour.store(tour);
      $httpBackend.flush();
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });
  });

});
