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

describe('#helpMessage', function() {
  it('returns helpful information', function() {
    var callback = jasmine.createSpy('callback');
    helpMessage(callback);
    expect(callback).toHaveBeenCalledWith(buildSpeechletResponseWithoutCard("To play the game select a tactically advantageous underground station.", "Go ahead.  Select a station", false));
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

describe('#handlePlayRequest', function() {
  it('returns a random comment', function() {
    spyOn(Math, 'random').and.returnValue(0.5);
    var callback = jasmine.createSpy('callback');
    handlePlayRequest(callback)
    expect(callback).toHaveBeenCalledWith(buildSpeechletResponseWithoutCard("Mind the gap!", "", false))
  })
})

describe('#handleWinRequest', function() {
  it('returns a random win message', function() {
    spyOn(Math, 'random').and.returnValue(0.5);
    var callback = jasmine.createSpy('callback');
    handleWinRequest(callback)
    expect(callback).toHaveBeenCalledWith(buildSpeechletResponseWithoutCard("You won! That was a real doozy.", "", true))
  })
})

describe('buildSpeechletResponse', function() {
  it('builds a speech response object with card', function() {
    expect(buildSpeechletResponse('mornington crescent', 'You won!', '', true)).toEqual(
      {
        outputSpeech: {
          type: "PlainText",
          text: 'You won!'
        },
        card: {
          type: "Simple",
          title: 'mornington crescent',
          content: 'You won!'
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

describe('buildSpeechletResponseWithoutCard', function() {
  it('builds a speech response object', function() {
    expect(buildSpeechletResponseWithoutCard('You won!', '', true)).toEqual(
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
