const initialState = {
  path: '',
  params: {},
  name: 'NO_MATCH',
};

export default function (state = initialState, action) {
  if (action.type === '@@redux-route') {
    return action.payload;
  }
  return state;
}
