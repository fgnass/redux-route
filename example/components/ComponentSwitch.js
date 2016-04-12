import React from 'react';
import { connect } from 'react-redux';
import { selectComponent } from '../../src';

import ButtonsPage from './ButtonsPage';
import TotalPage from './TotalPage';

function ComponentSwitch(props) {
  return props.component;
}

const mapStateToProps = selectComponent({
  home: () => <div>Home page</div>,
  buttons: () => <ButtonsPage />,
  total: () => <TotalPage />,
  NO_MATCH: () => <div>unknown route</div>,
});

export default connect(mapStateToProps)(ComponentSwitch);
