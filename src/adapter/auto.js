import history from './history';
import hash from './hash';

export default function () {
  const adapter = window.history && history.pushState ? history : hash;
  return adapter();
}
