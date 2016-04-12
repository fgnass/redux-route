import React, { Component } from 'react';
import ComponentSwitch from './ComponentSwitch';
import router from '../router';

const { url, goto } = router;

class App extends Component {
  render() {
    return (
      <div>
        <h1>Links</h1>
        <div><a href={url('home')}>Home</a></div>
        <div><a href={url('buttons')}>Buttons</a></div>
        <div><a href={url('buttons', { by: 2 })}>Buttons (± two)</a></div>
        <div><u onClick={() => goto('buttons', { by: 5 })}>Buttons (± five)</u></div>
        <div><a href={url('total')}>Total</a></div>
        <div><a href="#/some/unknown/path">Unknown</a></div>
        <h1>View</h1>
        <ComponentSwitch />
      </div>
    );
  }
}

export default App;
