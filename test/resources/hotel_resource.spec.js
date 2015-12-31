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
    it('parse and sort results', function(){
      var hotel1 = { objectId: 'a1', name: 'California' };
      var hotel2 = { objectId: 'b1', name: 'Welcome' };
      var response = { results: [hotel1, hotel2] };
      $httpBackend.expectGET(APIurl).respond(200, response);
      $httpBackend.flush();
      expect(Hotel.all().length).toBe(2);
      expect(Hotel.all()[0].name).toBe(hotel1.name);
    });
  });

});
