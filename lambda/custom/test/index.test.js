const vax = require("virtual-alexa");

test('Launches successfully', async () => {
  const alexa = vax.VirtualAlexa.Builder()
    .handler("index.handler")
    .interactionModelFile("../../models/ja-JP.json")
    .create();

  const reply = await alexa.launch();
  expect(reply.response.outputSpeech.ssml).toMatch(/知りたいごみ収集日はいつですか/);
});
