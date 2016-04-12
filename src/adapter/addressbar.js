import URL from 'url-parse';

export default function () {
  // require dynamically because addressbar instantly registers an event handler
  const addressbar = require('addressbar');

  function getPath() {
    return addressbar.pathname;
  }

  function setPath(path) {
    addressbar.value = path;
  }

  function listen(listener) {
    addressbar.addEventListener('change', event => {
      const url = new URL(event.target.value);
      listener(url.pathname);
      event.preventDefault();
    });
  }

  return {
    getPath,
    setPath,
    listen,
  };
}
