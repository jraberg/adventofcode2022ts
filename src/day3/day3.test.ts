import { priority } from '../day3/day3';

describe('Day3', function() {
  it('should return correct priorities', ()=> {
    expect(priority('p')).toEqual(16);
    expect(priority('L')).toEqual(38);
    expect(priority('P')).toEqual(42);
    expect(priority('v')).toEqual(22);
    expect(priority('t')).toEqual(20);
  });
});
