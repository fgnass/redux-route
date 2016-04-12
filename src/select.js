/*
const componentSelector = createComponentSelector({
  home: () => <Home />,
  users: (params) => <Users id={params.id} />
}, routeSelector);
*/

export default function createComponentSelector(components, routeSelector) {
  return function componentSelector(state) {
    const route = routeSelector ? routeSelector(state) : state.route;
    const createComponent = components[route.name];
    const component = createComponent
      ? createComponent(route.params, route.path)
      : null;

    return { component };
  };
}
