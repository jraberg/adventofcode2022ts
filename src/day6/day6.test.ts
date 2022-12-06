import { firstPositionAfterUniqChars } from './day6';

describe('day6 - part1', () => {
  it('should return 5 for the first position after 4 unique characters', () => {
    expect(firstPositionAfterUniqChars('bvwbjplbgvbhsrlpgdmjqwftvncz', 4)).toBe(5);
  });
  it('should return 6 for the first position after 4 unique characters', () => {
    expect(firstPositionAfterUniqChars('nppdvjthqldpwncqszvftbrmjlhg', 4)).toBe(6);
  });

  it('should return 10 for the first position after 4 unique characters', () => {
    expect(firstPositionAfterUniqChars('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 4)).toBe(10);
  });
  it('should return 11 for the first position after 4 unique characters', () => {
    expect(firstPositionAfterUniqChars('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 4)).toBe(11);
  });
});

describe('day6 - part2', () => {
  it('should return 19 for the first position after 14 unique characters', () => {
    expect(firstPositionAfterUniqChars('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14)).toBe(19);
  });
  it('should return 23 for the first position after 14 unique characters', () => {
    expect(firstPositionAfterUniqChars('bvwbjplbgvbhsrlpgdmjqwftvncz', 14)).toBe(23);
  });
  it('should return 23 for the first position after 14 unique characters', () => {
    expect(firstPositionAfterUniqChars('nppdvjthqldpwncqszvftbrmjlhg', 14)).toBe(23);
  });
  it('should return 29 for the first position after 14 unique characters', () => {
    expect(firstPositionAfterUniqChars('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14)).toBe(29);
  });
  it('should return 26 for the first position after 14 unique characters', () => {
    expect(firstPositionAfterUniqChars('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14)).toBe(26);
  });
});
