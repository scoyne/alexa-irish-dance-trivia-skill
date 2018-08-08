/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const cookbook = require('./alexa-cookbook.js');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

const SKILL_NAME = 'Baldwin Wallace University Facts';
const GET_FACT_MESSAGE = 'Here\'s your fact: ';
const HELP_MESSAGE = 'You can say tell me a Baldwin Wallace University fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const FALLBACK_MESSAGE = 'The Baldwin Wallace University Facts skill can\'t help you with that.  It can help you discover facts about Baldwin Wallace University if you say tell me a Baldwin Wallace University fact. What can I help you with?';
const FALLBACK_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/lambda/data
//=========================================================================================================================================

const data = [
  "Baldwin Wallace University is a private, liberal arts-based, Methodist-affiliated college located in Berea, Ohio.",
  "Baldwin Wallace University offer bachelor's and master's degrees, as well as perfossional education programs and certificates.",
  "The mission of Baldwin Wallace University is to be  an academic community commited to the liberal arts and sciences as the foundation for lifelong learning.",
  "Founded in eighteen hundred forty-five, Baldwin Wallace was founded as one of the first colleges in the nation to admin students wthut regard to race or gender.",
  "Baldwin Wallace University was founded in eighteen hundred forty-five.",
  "Baldwin Wallace University employs over two hundred full-time faculty members.",
  "The student to faculty ratio at Baldwin Wallace is eleven to one.",
  "Baldwin Wallace University is accredited by the Higher Learning Commission, a commission of he North Central Association of Colleges and Schools.",
  "U.S. News and World Reports has consistently ranked Baldwin Wallace University among the Midwest's Best Universities.",
  "The Baldwin Wallace University Reimenschneider Bach Institute is one of only five institutions in North and South America to possess manuscripts writted by Johan Sabastian Bach.",
  "Baldwin Wallace University is ranked as one of the Top Workplaces in Northeast Ohio.",
  "The Baldwin Wallace University mascot is the Yellow Jacket.",
  "Baldwin Wallace University was the first college in Ohio to offer an undergraduate program in sustainability.",
  "Baldwin Wallace University is named one of the top ten colleges for Musical Theater by Backstage.",
  "Baldwin Wallace University graduates pas the National Council Licensure Examination at ratess that place Baldwin Wallace among the top-performing nursing programs in the state.",
  "Baldwin Wallace's WBWC the sting, is the first totally student-funded and operated radio station in the United States.",
  "U.S. News and World Reports perennially recognizes Baldwin Wallace as a Best Value in higher education.",
  "Forbes recognizes Baldwin Wallace as top college for return on investment.",
  "CEO WORLD ranks Baldiwn Wallace University among the 100 Best Value Private Colleges in America.",
  "The Economist ranks Baldwin Wallace among the best for alumni earning that exceed expectations.",
  "Founded in eighteen hundred forth-five, Baldwin Wallace University was founded with a givt from John Baldwin of a fifty acres of land.",
  "The first graduate from Baldwin Wallace University was Maria Poe.",
  "In nineteen hundred thirteen Baldwin University and German Wallace College merged to create Baldwin Wallace College.",
  "While Baldwin Wallace University ontinues to innovate on many levels, the institution’s community of learners is supported by enduring values of inclusion, support, engagement and excellence. The result is a distinctive student-centered experience that supports each individual in achieving his or her full potential in pursuit of big dreams, meaningful careers and an extraordinary life.",
  "Baldwin Wallace University is a four-year private, co-educational, liberal arts college in Berea, Ohio, United States.", 
  "Baldwin Wallace University was founded in eighteen hundred fourty-five as Baldwin Institute by Methodist settlers.",
  "Baldwin Wallace University is known for its education, business, neuroscience, and music programs."
  "Baldwin Wallace University is home to the Riemenschneider-Bach Institute and the Baldwin Wallace Conservatory of Music.",
  "The Baldwin Wallace University Conservatory of Music holds the title for the oldest collegiate Bach Festival in the nation.",
  "The Baldwin Wallace University radio station WBWC the sting has a large loyal following throughout the Cleveland area .",
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const randomFact = cookbook.getRandomItem(data);
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const FallbackHandler = {
  // 2018-May-01: AMAZON.FallackIntent is only currently available in en-US locale.
  //              This handler will not be triggered except in that locale, so it can be
  //              safely deployed for any locale.
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(FALLBACK_MESSAGE)
      .reprompt(FALLBACK_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
