const vax = require("virtual-alexa");

const alexa = vax.VirtualAlexa.Builder()
  .handler("index.handler")
  .interactionModelFile("../../models/ja-JP.json")
  .create();

test('launches successfully', async () => {
  const reply = await alexa.launch();
  expect(reply.response.outputSpeech.ssml).toMatch(/知りたいごみ収集日はいつですか?/);
});

test('gets a schedule successfully', async () => {
  const reply = await alexa.intend("ScheduleIntent", { date: "2019-04-01" });
  expect(reply.response.outputSpeech.ssml).toMatch(/2019-04-01は燃やせるごみの日です。/);
});
