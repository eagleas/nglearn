describe('TourController', function(){
  beforeEach(module('tnTour'));

  var Hotel;
  var APIurl = "https://api.parse.com/1/classes/Hotel";
  var $httpBackend;

  beforeEach(inject(function(_Hotel_, _$httpBackend_){
    Hotel = _Hotel_;
    $httpBackend = _$httpBackend_;
  }));

  describe('initialize', function(){
    it('expect call to parse.com', function(){
      $httpBackend.expectGET(APIurl).respond(200);
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });
    it('parse results', function(){
      var hotel1 = { objectId: 'a1', name: 'California' };
      var hotel2 = { objectId: 'b1', name: 'Welcome' };
      var response = { results: [hotel1, hotel2] };
      $httpBackend.expectGET(APIurl).respond(200, response);
      $httpBackend.flush();
      expect(Hotel.all().length).toBe(2);
      expect(Hotel.all()[0].name).toBe(hotel1.name);
    });
  });

  describe('functions', function(){
    it('add hotel', function(){
      $httpBackend.whenGET(APIurl).respond(200, { results: []});
      var objId = 'p1';
      $httpBackend.expectPOST(APIurl).respond(201, { objectId: objId });
      var hotel = { name: 'Hotel1', place: {objectId: 'p1', name: 'Place1'} };
      Hotel.add(hotel);
      $httpBackend.flush();
      expect(Hotel.all().length).toBe(1);
      expect(Hotel.all()[0].objectId).toBe(objId);
      expect(Hotel.all()[0].name).toBe(hotel.name);
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('remove hotel', function(){
      var hotel = { objectId: 'h1', name: 'Hotel1', place: {objectId: 'p1', name: 'Place1'} };
      $httpBackend.whenGET(APIurl).respond(200, { results: [hotel] });
      $httpBackend.flush();
      expect(Hotel.all().length).toBe(1);
      $httpBackend.expectDELETE(APIurl+'/'+hotel.objectId).respond(200);
      Hotel.remove(hotel);
      $httpBackend.flush();
      expect(Hotel.all().length).toBe(0);
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('store hotel', function(){
      var hotel = { objectId: 'h1', name: 'Hotel1', place: {objectId: 'p1', name: 'Place1'} };
      $httpBackend.whenGET(APIurl).respond(200, { results: [hotel] });
      var draft_title = 'a New hotel';
      var draft = angular.copy(hotel);
      draft.title = draft_title;
      hotel.draft = draft;
      $httpBackend.expectPUT(APIurl+'/'+hotel.objectId).respond(200, {results: [draft]});
      Hotel.store(hotel);
      $httpBackend.flush();
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });
  });

});
