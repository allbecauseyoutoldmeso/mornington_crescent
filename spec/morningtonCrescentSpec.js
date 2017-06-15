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

describe('#onIntent', function() {
  it('recognises a non winning station', function() {
    spyOn(self, 'handlePlayRequest');
    onIntent(playEvent().request, 'callback')
    expect(self.handlePlayRequest).toHaveBeenCalled();
  });
  it('recognises mornington crescent', function() {
    spyOn(self, 'handleWinRequest');
    onIntent(morningtonCrescentEvent().request, 'callback')
    expect(self.handleWinRequest).toHaveBeenCalled();
  })
})

describe('#buildResponse', function() {
  it('builds a response object', function() {
    expect(buildResponse('attributes', 'response')).toEqual({version: "1.0", sessionAttributes: 'attributes', response: 'response'})
  })
})
