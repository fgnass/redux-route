import { createRouter, auto } from '../src';

const routes = {
  home: '/',
  buttons: '/path/to/buttons(/by/:by)',
  total: '/path/to/total',
};

export default createRouter(routes, auto);
