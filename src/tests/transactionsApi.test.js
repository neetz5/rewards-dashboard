import { calcPoints } from "../api/transactionsApi";

//  calculate reward Points as per the example given

describe("calcPoints()", () => {
  describe("checking points for transactions", () => {
    test("awards 90 points for amount $120", () => {
      expect(calcPoints(120)).toBe(90);
    });

    test("awards 0 points for a small amount ($50)", () => {
      expect(calcPoints(50)).toBe(0);
    });

    test("awards 0 points for amount of $0", () => {
      expect(calcPoints(0)).toBe(0);
    });
  });

  describe("edge cases", () => {
    test("returns a number, not a string", () => {
      expect(typeof calcPoints(300)).toBe("number");
      expect(typeof calcPoints(100)).toBe("number");
    });
  });
});
