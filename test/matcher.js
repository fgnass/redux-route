import expect from 'unexpected';

import createMatcher from '../src/matcher';

describe('matcher', () => {
  const match = createMatcher({
    home: '/',
    items: '/items(/detail/:id)',
  });

  it('should match /', () => {
    expect(match('/'), 'to equal', { path: '/', name: 'home', params: {} });
  });

  it('should support optional parts', () => {
    expect(match('/items'), 'to equal', { path: '/items', name: 'items', params: {} });
  });

  it('should extract url params', () => {
    expect(match('/items/detail/23'), 'to satisfy', { params: { id: '23' } });
  });

  it('should return NO_MATCH as name if no route matches', () => {
    expect(match('/foo'), 'to equal', { path: '/foo', name: 'NO_MATCH', params: {} });
  });
});
