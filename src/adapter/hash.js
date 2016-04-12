function normalize(hash) {
  if (!hash) return '/';

  // remove # prefix
  const path = hash[0] === '#' ? hash.slice(1) : hash;

  // ensure leading /
  return path[0] === '/' ? path : '/' + path;
}

function format(path) {
  return '#' + path;
}

export default function (win = window) {
  const location = win.location;

  function getPath() {
    return normalize(location.hash);
  }

  function setPath(path) {
    location.hash = path;
  }

  function listen(listener) {
    win.addEventListener('hashchange', () => {
      listener(getPath());
    });
  }

  return {
    getPath,
    setPath,
    listen,
    format,
  };
}
