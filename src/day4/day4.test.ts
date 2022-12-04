import { fullyContains, partiallyContains } from "./day4";

describe("day4", () => {
  it("should correctly identify containing ranges", () => {
    expect(fullyContains([2, 8], [3, 7])).toBeTruthy();
    expect(fullyContains([2, 4], [6, 8])).toBeFalsy();
    expect(fullyContains([2, 3], [4, 5])).toBeFalsy();
    expect(fullyContains([5, 7], [7, 9])).toBeFalsy();
    expect(fullyContains([2, 8], [3, 7])).toBeTruthy();
    expect(fullyContains([6, 6], [4, 6])).toBeTruthy();
    expect(fullyContains([2, 6], [4, 8])).toBeFalsy();
  });

  it("should correctly identify overlapping ranges", () => {
    expect(partiallyContains([2, 4], [6, 8])).toBeFalsy();
    expect(partiallyContains([2, 3], [4, 5])).toBeFalsy();
    expect(partiallyContains([5, 7], [7, 9])).toBeTruthy();
    expect(partiallyContains([2, 8], [3, 7])).toBeTruthy();
    expect(partiallyContains([6, 6], [4, 6])).toBeTruthy();
    expect(partiallyContains([2, 6], [4, 8])).toBeTruthy();
  });
});
