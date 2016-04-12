import URL from 'url-parse';

export default function (url) {
  const path = new URL(url).pathname;
  return {
    getPath() {
      return path;
    },
    setPath() {},
    listen() {},
  };
}
