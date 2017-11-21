import React, { Component } from 'react';
import './App.css';
import NewGame from './components/NewGame';
import JoinGame from './components/JoinGame';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NewGame />
        <JoinGame />
      </div>
    );
  }
}

export default App;
