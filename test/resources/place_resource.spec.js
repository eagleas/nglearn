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
    it('parse and sort results', function(){
      var place1 = { objectId: 'a1', name: 'Place 1' };
      var place2 = { objectId: 'b1', name: 'Place 2' };
      var response = { results: [place1, place2] };
      $httpBackend.expectGET(APIurl).respond(200, response);
      $httpBackend.flush();
      expect(Place.all().length).toBe(2);
      expect(Place.all()[0].name).toBe(place1.name);
    });
  });

});
