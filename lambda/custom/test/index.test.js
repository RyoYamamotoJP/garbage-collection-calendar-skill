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

describe("GetScheduleIntentHandler", () => {
  describe("without date", () => {
    test("outputs すみません、収集日を聞き取れませんでした。", async () => {
      const reply = await alexa.intend("GetScheduleIntent");
      expect(reply.response.outputSpeech.ssml).toMatch(/すみません、収集日を聞き取れませんでした。/);
    });
  });

  describe("with invalid date", () => {
    test("outputs すみません、収集日を理解できませんでした。", async () => {
      const reply = await alexa.intend("GetScheduleIntent", { date: "2019-04-XX" });
      expect(reply.response.outputSpeech.ssml).toMatch(/すみません、収集日を理解できませんでした。/);
    });
  });

  describe("with no scheduled date", () => {
    test("outputs ごめんなさい、その日はわかりません。", async () => {
      const reply = await alexa.intend("GetScheduleIntent", { date: "2020-04-01" });
      expect(reply.response.outputSpeech.ssml).toMatch(/ごめんなさい、その日はわかりません。/);
    });
  });

  test("gets a schedule successfully", async () => {
    const reply = await alexa.intend("GetScheduleIntent", { date: "2019-04-01" });
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
