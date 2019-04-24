/* eslint-disable  no-console */

const Calendar = require("../calendar");

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

describe('Calendar("foo", "bar")', () => {
  test("throws Error", () => {
    expect(() => {
      new Calendar("foo", "bar")
    }).toThrow(/no such file or directory/);
  });
});

describe('Calendar("tsukuba", "north")', () => {
  const calendar = new Calendar("tsukuba", "north");

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
  ])(".on(%p)", (date, expected) => {
    test(`returns ${expected}`, () => {
      expect(calendar.on(date)).toEqual(expected);
    });
  });

  describe('.on("2019-03-31")', () => {
    test("returns undefined", () => {
      expect(calendar.on("2019-03-31")).toBeUndefined();
    });
  });

  describe('.on("2019-04-XX")', () => {
    test("returns undefined with deprecation warning", () => {
      expect(calendar.on("2019-04-XX")).toBeUndefined();
      expect(console.warn).toHaveBeenCalledTimes(1);
      expect(console.warn.mock.calls[0][0]).toMatch(/Deprecation warning/);
    });
  });
});
