import expect from 'unexpected';
import { createRouter } from '../src';

describe('router', () => {
  const adapter = {
    path: '/',
    getPath() { return this.path; },
    setPath(path) { this.path = path; },
    listen(cb) { this.listener = cb; },
    format(path) { return '#' + path; },
  };

  const router = createRouter({
    home: '/',
    items: '/items(/:id)',
  }, adapter);

  it('should build urls', () => {
    expect(router.url('home'), 'to equal', '#/');
  });

  it('should build urls with params', () => {
    expect(router.url('items', { id: 23 }), 'to equal', '#/items/23');
  });

  describe('when connected', () => {
    const store = {
      dispatch(action) {
        this.action = action;
      },
    };

    router.connectToStore(store);

    it('should dispatch an initial action', () => {
      expect(store.action, 'to satisfy', { payload: { path: '/' } });
    });

    it('should register with the adapter', () => {
      expect(adapter.listener, 'to be a', 'function');
    });

    it('should dispatch actions triggered by the adapter', () => {
      adapter.listener('/items');
      expect(store.action, 'to satisfy', {
        payload: { path: '/items', name: 'items' },
      });
    });

    it('should synchronize the adapter', () => {
      router.navigate('/items/42');
      expect(store.action, 'to satisfy', {
        payload: { path: '/items/42' },
      });
      expect(adapter.path, 'to equal', '/items/42');
    });
  });
});
