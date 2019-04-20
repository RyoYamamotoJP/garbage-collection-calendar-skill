/* eslint-disable  no-console */

const calendar = require("../tsukuba-north-2019");

beforeAll(() => {
  jest.spyOn(Date, "now").mockImplementation(() => new Date("2019-04-01"));
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

beforeEach(() => {
  console.warn.mockClear();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe.each([
  ["2019-04-01", ["燃やせるごみ"]],
  ["2019-04-02", ["びん", "スプレー容器"]],
  ["2019-04-03", ["燃やせないごみ"]],
  ["2019-04-04", ["燃やせるごみ"]],
  ["2019-04-05", ["プラ製容器包装", "粗大ごみ"]],
  ["2019-04-06", ["収集なし"]],
  ["2019-04-07", ["収集なし"]],
  ["2019-04-09", ["ペットボトル"]],
  ["2019-04-10", ["古紙", "古布"]],
  ["2019-04-12", ["かん"]],
  ["2019-12-28", ["燃やせるごみ"]],
  ["2019-12-30", ["収集なし"]]
])(".garbageTypesOn(%p)", (date, expected) => {
  test(`returns ${expected}`, () => {
    expect(calendar.garbageTypesOn(date)).toEqual(expected);
  });
});

describe('.garbageTypesOn("2019-04-XX")', () => {
  test("returns 燃やせるごみ with deprecation warning", () => {
    expect(calendar.garbageTypesOn("2019-04-XX")).toEqual(["燃やせるごみ"]);
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn.mock.calls[0][0]).toMatch(/Deprecation warning/);
  });
});
