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
    "Are you blooming insane?",
    "I've not seen that since Archie Gimmel scored against Holland in 1978!",
    "Mind the gap!",
    "A bold, unorthodox move. I must say, I'm impressed.",
    "Not sure about that one. Why not, instead, do a transverse straddle to Oval, leaving the District Line free for LV increments?",
    "That really opens things up. Surely it'll soon be possible to supercede after a parallel move.",
    "Hmm. At this point it would be interesting to extrapolate through parallel shunts to a predicted future event, roughly corresponding to the relative impact of Tooting Bec on Shepherd's Bush, as those shunts converge on a dialectic axis.",
    "Crabbit's Law in play, which dictates that the illegality of vectored access to low coordinates within the Rhombus of Apperley is non-negotiable under any circumference.",
    "All Egyptian moves are disallowed except crossovers and double takes.",
    "Nothing fancy and leaves a few options open when in or recently out of knip.",
    "That really shows you how the Swedish Inversion works to mix it up a bit.",
    "Shrewd. Very shrewd indeed",
    "Nailbiting stuff. I can't wait to see how that's going to be followed up. Something towards the west end of the Bakerloo perhaps? No, a bit crude in current conditions."
];

var winMessages = [
  "Jolly well played chaps!",
  "I haven't seen play of that calibre since 1942",
  "That was a real doozy.",
  "Excellent work gentlemen."
];

function eventHandler(event, context) {
  try {
    if (event.request.type === "LaunchRequest") {
      welcomeMessage(function callback(speechletResponse) {
        context.succeed(buildResponse(event.session.attributes, speechletResponse));
      });
    } else if (event.request.type === "IntentRequest") {
      handleIntent(event.request, function callback(speechletResponse) {
        context.succeed(buildResponse(event.session.attributes, speechletResponse));
      });
    }
  } catch (e) {
    context.fail("Exception: " + e);
  }
};

function welcomeMessage(callback) {
  callback(buildSpeechResponse("Good afternoon and welcome to Mornington Crescent! Player one, name your station!", "", false));
}

function handleIntent(intentRequest, callback) {
  if (intentRequest.intent.name == "AMAZON.HelpIntent") {
    helpMessage(callback)
  } else if (intentRequest.intent.name == "AMAZON.StopIntent") {
    goodbyeMessage(callback)
  } else if (intentRequest.intent.name == 'PlayIntent') {
    handlePlayRequest(intentRequest.intent.slots.station.value, callback);
  } else {
    throw "Invalid intent";
  }
}

function handlePlayRequest(station, callback) {
  if (station == 'mornington crescent') {
    handleWinRequest(callback);
  } else {
    generateRandomComment(callback)
  }
}

function generateRandomComment(callback) {
  var randomComment = playMessages[Math.floor(Math.random() * playMessages.length)];
  callback(buildSpeechResponse(randomComment + ' Next player, name your station.', "", false));
}

function handleWinRequest(callback) {
  var winMessage = winMessages[Math.floor(Math.random() * winMessages.length)];
  callback(buildSpeechResponse('You won! ' + winMessage, "", true));
}

function helpMessage(callback) {
  callback(buildSpeechResponse("To play the game select a tactically advantageous underground station.", "Go ahead.  Select a station", false))
}

function goodbyeMessage(callback) {
  callback(buildSpeechResponse("Bye for now.  Do tune in again sometime soon.", "", true))
}

function buildSpeechResponse(output, repromptText, shouldEndSession) {
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
