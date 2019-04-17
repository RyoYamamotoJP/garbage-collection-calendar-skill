const calendar = require('../tsukuba-north-2019');

test('gerbage types on first Sunday to equal ["収集なし"]', () => {
  expect(calendar.garbageTypesOn("2019-04-07")).toEqual(["収集なし"]);
});

test('gerbage types on first Monday to equal ["燃やせるごみ"]', () => {
  expect(calendar.garbageTypesOn("2019-04-01")).toEqual(["燃やせるごみ"]);
});

test('gerbage types on first Tuesday to equal ["びん", "スプレー容器"]', () => {
  expect(calendar.garbageTypesOn("2019-04-02")).toEqual(["びん", "スプレー容器"]);
});

test('gerbage types on first Wednesday to equal ["燃やせないごみ"]', () => {
  expect(calendar.garbageTypesOn("2019-04-03")).toEqual(["燃やせないごみ"]);
});

test('gerbage types on first Thursday to equal ["燃やせるごみ"]', () => {
  expect(calendar.garbageTypesOn("2019-04-04")).toEqual(["燃やせるごみ"]);
});

test('gerbage types on first Friday to equal ["プラ製容器包装", "粗大ごみ"]', () => {
  expect(calendar.garbageTypesOn("2019-04-05")).toEqual(["プラ製容器包装", "粗大ごみ"]);
});

test('gerbage types on first Saturday to equal ["収集なし"]', () => {
  expect(calendar.garbageTypesOn("2019-04-06")).toEqual(["収集なし"]);
});

test('gerbage types on second Tuesday to equal ["収集なし"]', () => {
  expect(calendar.garbageTypesOn("2019-04-09")).toEqual(["ペットボトル"]);
});

test('gerbage types on second Tuesday to equal ["ペットボトル"]', () => {
  expect(calendar.garbageTypesOn("2019-04-09")).toEqual(["ペットボトル"]);
});

test('gerbage types on second Wednesday to equal ["古紙", "古布"]', () => {
  expect(calendar.garbageTypesOn("2019-04-10")).toEqual(["古紙", "古布"]);
});

test('gerbage types on second Friday to equal ["かん"]', () => {
  expect(calendar.garbageTypesOn("2019-04-12")).toEqual(["かん"]);
});

test('gerbage types on 2019-12-28 to equal ["燃やせるごみ"]', () => {
  expect(calendar.garbageTypesOn("2019-12-28")).toEqual(["燃やせるごみ"]);
});

test('gerbage types on 2019-12-30 to equal ["収集なし"]', () => {
  expect(calendar.garbageTypesOn("2019-12-30")).toEqual(["収集なし"]);
});
