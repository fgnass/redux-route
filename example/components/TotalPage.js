import React, { Component } from 'react';
import { connect } from 'react-redux';

class TotalPage extends Component {
  render() {
    const { counter } = this.props;
    return (
      <div>
        Total: {counter}
      </div>
    );
  }
}

export default connect(({ counter }) => ({ counter }))(TotalPage);
