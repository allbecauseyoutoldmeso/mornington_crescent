describe('#eventHandler', function() {
  it('recognises a launch request and triggers a welcome message', function() {
    spyOn(self, 'onLaunch');
    eventHandler(launchEvent(), alexaContext());
    expect(self.onLaunch).toHaveBeenCalled();
  });
  it('recognises an intent request', function() {
    spyOn(self, 'onIntent');
    eventHandler(playEvent(), alexaContext());
    expect(self.onIntent).toHaveBeenCalled();
  });
});

describe('#onLaunch', function() {
  it('returns a greeting', function() {
    var callback = jasmine.createSpy('callback');
    onLaunch(callback);
    expect(callback).toHaveBeenCalledWith(buildSpeechletResponse("Mornigton Crescent", "Good afternoon and welcome to Mornington Crescent! First player, name your station!", "", false));
  });
});
