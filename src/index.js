import UrlPattern from 'url-pattern';
import matcher from './matcher';
import routeReducer from './reducer';
import selectComponent from './select';

import hash from './adapter/hash';
import history from './adapter/history';
import auto from './adapter/auto';
import fixed from './adapter/fixed';

function createAdapter(adapt) {
  if (typeof adapt === 'string') return fixed(adapt);
  if (typeof adapt === 'function') return adapt();
  return adapt;
}
function createRouter(routes, adapt = hash) {
  const adapter = createAdapter(adapt);
  const match = matcher(routes);

  function url(name, params) {
    const route = routes[name];
    const pattern = new UrlPattern(route);
    const path = pattern.stringify(params);
    return adapter.format ? adapter.format(path) : path;
  }

  function navigate(path) {
    if (adapter.getPath() !== path) {
      adapter.setPath(path);
    }
    return {
      type: '@@redux-route',
      payload: match(path),
    };
  }

  function goto(name, params) {
    return navigate(url(name, params));
  }

  const router = {
    connectToStore,
    navigate,
    goto,
    url,
  };

  function connectToStore(store) {
    adapter.listen(path => store.dispatch(navigate(path)));

    router.navigate = (...args) => {
      store.dispatch(navigate(...args));
    };
    router.goto = (...args) => {
      store.dispatch(goto(...args));
    };

    router.navigate(adapter.getPath());
  }

  return router;
}

export {
  createRouter,
  routeReducer,
  selectComponent,
  hash,
  history,
  auto,
  fixed,
};
