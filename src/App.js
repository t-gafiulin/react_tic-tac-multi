import React, { Component } from 'react';
import './App.css';
import NewGame from './components/NewGame';
import JoinGame from './components/JoinGame';
import Menu from './components/Menu';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
            <Route exact path="/" component={Menu} />
            <Route path="/newGame" component={NewGame} />
            <Route path="/joinGame" component={JoinGame} />
        </Switch>
      </Router> 
    );
  }
}

export default App;
