'use strict';

// exports.handler = function(event, context) { eventHandler(event, context) };

var playMessages = [
    "Traditional move, like the King’s pawn really, and gives you limited access to Northern parallels",
    "I suppose it is technically laying an off-side trap there. Force the next player into Knip if they're not very careful.",
    "Basically, things have changed slightly since the introduction of the night tube, so you can back double. So it is basically a Reverse move.",
    "That's a rather junior move but I'll allow it",
    "James the First gambit.  Cultured move.",
    "Oooh, clever strategy!",
    "Whoa? Its not Lent yet, is it?",
    "Personally, in that scenario, I'd have gone with Knightsbridge.",
    "Canny move.  Flanching rights claimed.",
    "Are you bloody insane?",
    "I've not seen that since Archie Gimmel scored against Holland in 1978!",
    "Mind the gap!"
];

var winMessages = [
  "Jolly well played chaps!",
  "I haven't seen play of that calibre since 1942",
  "That was a real doooozy.",
  "Excellent work gentlemen."
];

function eventHandler(event, context) {
  try {
    if (event.request.type === "LaunchRequest") {
      onLaunch(function callback(speechletResponse) {
        context.succeed(buildResponse(event.session.attributes, speechletResponse));
      });
    } else if (event.request.type === "IntentRequest") {
      onIntent(event.request, function callback(speechletResponse) {
        context.succeed(buildResponse(event.session.attributes, speechletResponse));
      });
    }
  } catch (e) {
    context.fail("Exception: " + e);
  }
};

function onLaunch(callback) {
  callback(buildSpeechletResponse("Mornigton Crescent", "Good afternoon and welcome to Mornington Crescent! First player, name your station!", "", false));
}

function onIntent(intentRequest, callback) {
  if (intentRequest.intent.slots.station.value == 'mornington crescent') {
    handleWinRequest(callback);
  } else if (intentRequest.intent.name == 'PlayIntent') {
    handlePlayRequest(callback);
  }
  else {
    throw "Invalid intent";
  }
}

function handlePlayRequest(callback) {
  var commentArr = playMessages;
  var commentIndex = Math.floor(Math.random() * commentArr.length);
  var randomComment = commentArr[commentIndex];
  callback(buildSpeechletResponseWithoutCard(randomComment, "", "false"));
}

function handleWinRequest(callback) {
  var winArr = winMessages;
  var winIndex = Math.floor(Math.random() * winArr.length);
  var winMessage = winArr[winIndex];
  callback(buildSpeechletResponseWithoutCard('You won! ' + winMessage, "", "true"));
}

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
  return {
    outputSpeech: {
      type: "PlainText",
      text: output
    },
    card: {
      type: "Simple",
      title: title,
      content: output
    },
    reprompt: {
      outputSpeech: {
        type: "PlainText",
        text: repromptText
      }
    },
    shouldEndSession: shouldEndSession
  };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
  return {
    outputSpeech: {
      type: "PlainText",
      text: output
    },
    reprompt: {
      outputSpeech: {
        type: "PlainText",
        text: repromptText
      }
    },
    shouldEndSession: shouldEndSession
  };
}

function buildResponse(sessionAttributes, speechletResponse) {
  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  };
}
