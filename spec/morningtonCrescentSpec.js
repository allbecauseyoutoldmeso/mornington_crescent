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

describe('#goodbyeMessage', function() {
  it('returns goodbye message and ends session', function() {
    var callback = jasmine.createSpy('callback');
    goodbyeMessage(callback);
    expect(callback).toHaveBeenCalledWith(buildSpeechletResponseWithoutCard("Bye for now.  Do tune in again sometime soon.", "", true));
  });
});

describe('#onIntent', function() {
  it('recognises a play request', function() {
    spyOn(self, 'handlePlayRequest');
    onIntent(playEvent().request, 'callback')
    expect(self.handlePlayRequest).toHaveBeenCalled();
  });

  it('recognises a help request', function() {
    spyOn(self, 'helpMessage');
    onIntent(helpEvent().request, 'callback')
    expect(self.helpMessage).toHaveBeenCalled();
  });
  it('recognises a stop request', function() {
    spyOn(self, 'goodbyeMessage');
    onIntent(stopEvent().request, 'callback')
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
    expect(callback).toHaveBeenCalledWith(buildSpeechletResponseWithoutCard("Mind the gap! Player two, name your station.", "", false))
  })
})

describe('#switchPlayer', function() {
  it('switches between players', function() {
    switchPlayer();
    expect(currentPlayer).toEqual('Player one')
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
