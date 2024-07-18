import Post from '../js/post.js';

const post = new Post();

describe('Post 검증 테스트 케이스', () => {
  test('1 + 2 = 3', () => {
    expect(post.sum(1, 2)).toBe(3);
  });
});
