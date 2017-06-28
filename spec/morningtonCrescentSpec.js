describe('#eventHandler', function() {
  it('recognises a launch request and triggers a welcome message', function() {
    spyOn(self, 'welcomeMessage');
    eventHandler(launchEvent(), alexaContext());
    expect(self.welcomeMessage).toHaveBeenCalled();
  });
  it('recognises an intent request', function() {
    spyOn(self, 'handleIntent');
    eventHandler(playEvent(), alexaContext());
    expect(self.handleIntent).toHaveBeenCalled();
  });
});

describe('#welcomeMessage', function() {
  it('returns a greeting', function() {
    var callback = jasmine.createSpy('callback');
    welcomeMessage(callback);
    expect(callback).toHaveBeenCalledWith(buildSpeechResponse("Good afternoon and welcome to Mornington Crescent! Player one, name your station!", "", false));
  });
});

describe('#helpMessage', function() {
  it('returns helpful information', function() {
    var callback = jasmine.createSpy('callback');
    helpMessage(callback);
    expect(callback).toHaveBeenCalledWith(buildSpeechResponse("To play the game select a tactically advantageous underground station.", "Go ahead.  Select a station", false));
  });
});

describe('#goodbyeMessage', function() {
  it('returns goodbye message and ends session', function() {
    var callback = jasmine.createSpy('callback');
    goodbyeMessage(callback);
    expect(callback).toHaveBeenCalledWith(buildSpeechResponse("Bye for now.  Do tune in again sometime soon.", "", true));
  });
});

describe('#handleIntent', function() {
  it('recognises a play request', function() {
    spyOn(self, 'handlePlayRequest');
    handleIntent(playEvent().request, 'callback')
    expect(self.handlePlayRequest).toHaveBeenCalled();
  });

  it('recognises a help request', function() {
    spyOn(self, 'helpMessage');
    handleIntent(helpEvent().request, 'callback')
    expect(self.helpMessage).toHaveBeenCalled();
  });
  it('recognises a stop request', function() {
    spyOn(self, 'goodbyeMessage');
    handleIntent(stopEvent().request, 'callback')
    expect(self.goodbyeMessage).toHaveBeenCalled();
  });
})

describe('#handlePlayRequest', function() {
  it('recognises mornington crescent', function() {
    spyOn(self, 'handleWinRequest');
    handlePlayRequest('mornington crescent', 'callback')
    expect(self.handleWinRequest).toHaveBeenCalled();
  })
  it('returns a random comment', function() {
    spyOn(Math, 'random').and.returnValue(0.5);
    var callback = jasmine.createSpy('callback');
    handlePlayRequest('pimlico', callback)
    expect(callback).toHaveBeenCalledWith(buildSpeechResponse("Mind the gap! Next player, name your station.", "", false))
  })
})

describe('#handleWinRequest', function() {
  it('returns a random win message', function() {
    spyOn(Math, 'random').and.returnValue(0.5);
    var callback = jasmine.createSpy('callback');
    handleWinRequest(callback)
    expect(callback).toHaveBeenCalledWith(buildSpeechResponse("You won! That was a real doozy.", "", true))
  })
})

describe('buildSpeechResponse', function() {
  it('builds a speech response object', function() {
    expect(buildSpeechResponse('You won!', '', true)).toEqual(
      {
        outputSpeech: {
          type: "PlainText",
          text: 'You won!'
        },
        reprompt: {
          outputSpeech: {
            type: "PlainText",
            text: ''
          }
        },
        shouldEndSession: true
      }
    )
  })
})

describe('#buildResponse', function() {
  it('builds a response object', function() {
    expect(buildResponse('attributes', 'response')).toEqual({version: "1.0", sessionAttributes: 'attributes', response: 'response'})
  })
})
