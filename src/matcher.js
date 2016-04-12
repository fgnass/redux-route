import UrlPattern from 'url-pattern';

function createMatcher(routes) {
  const patterns = [];

  Object.keys(routes).forEach(name => {
    const pattern = new UrlPattern(routes[name]);
    pattern.name = name;
    patterns.push(pattern);
  });

  return function match(path) {
    const noMatch = {
      path,
      params: {},
      name: 'NO_MATCH',
    };

    return patterns.reduce((matching, pattern) => {
      const params = pattern.match(path);
      if (params) {
        return {
          path,
          params,
          name: pattern.name,
        };
      }
      return matching;
    }, noMatch);
  };
}

module.exports = createMatcher;
