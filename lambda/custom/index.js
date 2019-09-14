/* eslint-disable  func-names */
/* eslint-disable  no-console */
"use strict";

const SKILL_NAME = "ごみ出しカレンダー";

const Alexa = require("ask-sdk-core");
const Calendar = require("./calendar");

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    const speechText = "知りたいごみ収集日はいつですか?";
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  },
};

const GetScheduleIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "GetScheduleIntent";
  },
  handle(handlerInput) {
    let speechText;

    const date = handlerInput.requestEnvelope.request.intent.slots.date.value;
    if (!date) {
      speechText = "すみません、収集日を聞き取れませんでした。";
    } else if (!Date.parse(date)) {
      speechText = "すみません、収集日を理解できませんでした。";
    } else {
      const calendar = new Calendar("tsukuba", "north");
      const types = calendar.on(date);
      if (!types) {
        speechText = "ごめんなさい、その日はわかりません。";
      } else {
        speechText = `${date}は${types}の日です。`;
      }
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent";
  },
  handle(handlerInput) {
    const speechText = "今日は何の日、と言ってみてください。";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && (handlerInput.requestEnvelope.request.intent.name === "AMAZON.CancelIntent"
        || handlerInput.requestEnvelope.request.intent.name === "AMAZON.StopIntent");
  },
  handle(handlerInput) {
    const speechText = "さようなら。";

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
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
    console.log(`処理されたエラー: ${error.message}`);

    return handlerInput.responseBuilder
      .speak("すみません。コマンドを理解できませんでした。もう一度お願いします。")
      .reprompt("すみません。コマンドを理解できませんでした。もう一度お願いします。")
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    GetScheduleIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
