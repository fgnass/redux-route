import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ButtonsPage extends Component {
  render() {
    const by = parseFloat(this.props.by || 1);
    return (
      <div>
        <button onClick={() => this.props.increment(by)}>Increment</button>
        <button onClick={() => this.props.decrement(by)}>Decrement</button>
        <span>by {by}</span>
      </div>
    );
  }
}

export default connect(state => ({ by: state.route.params.by }), actions)(ButtonsPage);
