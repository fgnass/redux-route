export default function counter(state = 0, { type, by }) {
  switch (type) {
    case 'INCREMENT':
      return state + by;
    case 'DECREMENT':
      return state - by;
    default:
      return state;
  }
}
