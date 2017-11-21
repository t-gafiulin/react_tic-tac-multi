import React, { Component } from 'react';
import './App.css';
import NewGame from './components/NewGame';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NewGame />
      </div>
    );
  }
}

export default App;
