import expect from 'unexpected';
import { selectComponent } from '../src';

describe('selectComponent', () => {
  describe('without custom route selector', () => {
    const select = selectComponent({
      home: () => 'HOME',
      params: (params) => params,
      path: (params, path) => path,
    });

    it('should select a component based on the route name', () => {
      const comp = select({ route: { name: 'home' } });
      expect(comp, 'to equal', { component: 'HOME' });
    });

    it('should pass the url params as 1st argument', () => {
      const comp = select({ route: { name: 'params', params: { foo: 23 } } });
      expect(comp, 'to equal', { component: { foo: 23 } });
    });

    it('should pass the path as 2nd argument', () => {
      const comp = select({ route: { name: 'path', path: '/foo' } });
      expect(comp, 'to equal', { component: '/foo' });
    });

    it('should return null if no component matches', () => {
      const comp = select({ route: { name: 'NO_MATCH', path: '/foo' } });
      expect(comp, 'to equal', { component: null });
    });
  });

  describe('with custom route selector', () => {
    const select = selectComponent({
      home: () => 'HOME',
    }, state => state.url);

    it('should use the provided selector to get the route information', () => {
      const comp = select({ url: { name: 'home' } });
      expect(comp, 'to equal', { component: 'HOME' });
    });
  });
});
