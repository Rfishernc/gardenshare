import React, { Component } from 'react';
import './App.scss';
import zipcodeData from '../../data/zipcodeData';

class App extends Component {
  clickEvent = (event) => {
    event.preventDefault();
    zipcodeData('37090', '50');
  }

  render() {
    return (
      <div className="App">
        <button type='button' onClick={this.clickEvent}>Click me</button>
      </div>
    );
  }
}

export default App;
