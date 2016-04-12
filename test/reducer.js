import expect from 'unexpected';
import { routeReducer } from '../src';

describe('routeReducer', () => {
  const initialState = {
    path: '',
    params: {},
    name: 'NO_MATCH',
  };

  it('should return the initial state', () => {
    expect(routeReducer(undefined, {}), 'to equal', initialState);
  });

  it('should handle @@redux-route actions', () => {
    const action = {
      type: '@@redux-route',
      payload: {
        path: '/',
        params: {},
        name: 'home',
      },
    };
    expect(routeReducer(initialState, action), 'to equal', action.payload);
  });
});
