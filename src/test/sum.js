import sum from '../js/sum.js';

describe('SUM 검증 테스트 케이스', () => {
  let num;
  beforeEach(() => {
    num = 1;
  });
  afterEach(() => {
    num = 0;
  });

  it(
    ('num is 1',
    () => {
      expect(num).toBe(1);
    })
  );

  test('1 + 2 = 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('배열 테스트', () => {
    expect([num, sum(1, num)]).toEqual([1, 2]);
  });
});
