/* eslint-disable  no-console */

const vax = require("virtual-alexa");

const alexa = vax.VirtualAlexa.Builder()
  .handler("index.handler")
  .interactionModelFile("../../models/ja-JP.json")
  .create();

beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

beforeEach(() => {
  console.log.mockClear();
});

afterAll(() => {
  jest.restoreAllMocks();
});

  describe("LaunchRequestHandler", () => {
    test("launches successfully", async () => {
      const reply = await alexa.launch();
      expect(reply.response.outputSpeech.ssml).toMatch(/知りたいごみ収集日はいつですか?/);
    });
  });
  
  describe("ScheduleIntentHandler", () => {
    test("gets a schedule successfully", async () => {
      const reply = await alexa.intend("ScheduleIntent", { date: "2019-04-01" });
      expect(reply.response.outputSpeech.ssml).toMatch(/2019-04-01は燃やせるごみの日です。/);
    });
  });
  
  describe("HelpIntentHandler", () => {
    test("helps successfully", async () => {
      const reply = await alexa.intend("AMAZON.HelpIntent");
      expect(reply.response.outputSpeech.ssml).toMatch(/You can say hello to me!/);
    });
  });
  
  describe("CancelAndStopIntentHandler", () => {
    test("cancels successfully", async () => {
      const reply = await alexa.intend("AMAZON.CancelIntent");
      expect(reply.response.outputSpeech.ssml).toMatch(/Goodbye!/);
    });
  
    test("stops successfully", async () => {
      const reply = await alexa.intend("AMAZON.StopIntent");
      expect(reply.response.outputSpeech.ssml).toMatch(/Goodbye!/);
    });
  });

  describe("SessionEndedRequestHandler", () => {
    test("ends a session successfully", async () => {
      await alexa.endSession();
      expect(console.log).toHaveBeenCalledTimes(1);
      expect(console.log.mock.calls[0][0]).toMatch(/Session ended/);
    });
  });
  