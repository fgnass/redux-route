import addressbar from './addressbar';
import hash from './hash';

export default function () {
  const adapter = window.history && history.pushState ? addressbar : hash;
  return adapter();
}
