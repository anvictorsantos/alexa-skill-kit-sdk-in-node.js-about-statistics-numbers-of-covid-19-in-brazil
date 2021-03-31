/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
var axios = require("axios").default;

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Olá, sou a Alexa e estou aqui para lhe informar sobre casos da COVID-19, no Brasil. Sobre qual estado você gostaria de se informar ?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const GetEstadoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetEstadoIntent';
    },
    async handle(handlerInput) {
        var estado = handlerInput.requestEnvelope.request.intent.slots.estado.value;
        var codigo;
        let speakOutput = 'Hello World!';
        
        switch (estado) {
            case 'acre':
                codigo = 0;
                break;
            case 'alagoas':
                codigo = 1;
                break;
            case 'amapá':
                codigo = 2;
                break;
            case 'amazonas':
                codigo = 3;
                break;
            case 'bahia':
                codigo = 4;
                break;
            case 'ceará':
                codigo = 5;
                break;
            case 'distrito federal':
                codigo = 6;
                break;
            case 'espírito santo':
                codigo = 7;
                break;
            case 'goiás':
                codigo = 8;
                break;
            case 'maranhão':
                codigo = 9;
                break;
            case 'mato grosso':
                codigo = 10;
                break;
            case 'mato grosso do sul':
                codigo = 11;
                break;
            case 'minas gerais':
                codigo = 12;
                break;
            case 'pará':
                codigo = 13;
                break;
            case 'paraíba':
                codigo = 14;
                break;
            case 'paraná':
                codigo = 15;
                break;
            case 'pernambuco':
                codigo = 16;
                break;
            case 'piauí':
                codigo = 17;
                break;
            case 'rio de janeiro':
                codigo = 18;
                break;
            case 'rio grande do norte':
                codigo = 19;
                break;
            case 'rio grande do sul':
                codigo = 20;
                break;
            case 'rondônia':
                codigo = 21;
                break;
            case 'roraima':
                codigo = 22;
                break;
            case 'santa catarina':
                codigo = 23;
                break;
            case 'são paulo':
                codigo = 24;
                break;
            case 'sergipe':
                codigo = 25;
                break;
            case 'tocantins':
                codigo = 26;
                break;
        }
        
        var options = {
          method: 'GET',
          url: 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats',
          params: {country: 'Brazil'},
          headers: {
            'x-rapidapi-key': '95d3bfa95dmsh76f8fca3dceb3e5p1af900jsne10a3ad92b93',
            'x-rapidapi-host': 'covid-19-coronavirus-statistics.p.rapidapi.com'
          }
        };
        
        await axios.request(options).then(function (response) {
        	speakOutput = `Hoje, ${response.data.data.lastChecked}, o estado ${response.data.data.covid19Stats[codigo].province}, são: ${response.data.data.covid19Stats[codigo].confirmed} os confirmados; ${response.data.data.covid19Stats[codigo].deaths} os mortos; e ${response.data.data.covid19Stats[codigo].recovered} os recuperados, na data de hoje.`;
        }).catch(function (error) {
        	console.error(error);
        });

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        GetEstadoIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();