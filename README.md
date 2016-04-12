# Redux Route

## How would you implement routing if the address bar was just a regular input element?

[![Build Status](https://travis-ci.org/fgnass/redux-route.svg?branch=master)](https://travis-ci.org/fgnass/redux-route)

By default redux-route uses the [addressbar](https://www.npmjs.com/package/addressbar) module which makes the window's location behave like any other input field.

On top of that it uses the awesome [url-pattern](https://www.npmjs.com/package/url-pattern) library to perform the matching.

With this combination it's very simple to keep all the routing information inside the redux state which should be you application's single source of truth:

```js
import { createRouter, routeReducer } from 'redux-route';

const router = createRouter({
  home: '/',
  items: '/items/(:id)'
});

const rootReducer = combineReducers({
  route: routeReducer,
  // other reducers ...
});

// Dispatch actions when the URL changes:
router.connectToStore(store);
```

The redux state will now provide routing information under the key you chose. If `/items/23` was requested `state.route` would be:

```js
{
  path: '/items/23',
  params: { id: 23 },
  name: 'items'
}
```

## Component Selection

Use `state.route.name` to select which top-level component you want to display. Instead of a switch statement you can also use the `selectComponent` helper:

```js
import { selectComponent } from 'redux-route';

const mapStateToProps = selectComponent({
  home: (params, path) => <Home />,
  NO_MATCH: () => <Error />
});

connect(mapStateToProps)(Component);
```

## Adapters

Redux-route provides several adapters to obtain or modify the actual location:

* `hash`: Uses `location.hash` and `hashchange` events and also works in legacy browsers.
* `addressbar`: Uses the [addressbar](https://www.npmjs.com/package/addressbar) module.
* `auto`: Uses `addressbar` if supported and falls back to `hash`. This is the default.
* `fixed`: A static URL for server-side routing. Requires no DOM.

The adapter interface is very simple so you can provide your own implementation to match your needs.

## Credits

Thanks to [Arnaud Rinquin](https://github.com/ArnaudRinquin) for writing [redux-reroute](https://github.com/ArnaudRinquin/redux-reroute). This project started as a fork of his awesome work and the example app is still pretty much the same.

Thanks to [Christian Alfoni](https://github.com/christianalfoni) for making addressbar such a generic and standalone module.

Thanks to [Callum Jefferies](https://github.com/callum) for [redux-routing](https://www.npmjs.com/package/redux-routing) which is another awesome routing library that with its universal routing support inspired me to go with the _adapters_ approach.

Thanks to [Maximilian Krüger](https://github.com/snd) for writing [url-pattern](https://www.npmjs.com/package/url-pattern) which made it really easy to turn all the ideas into a lightweight router.

## License

MIT
