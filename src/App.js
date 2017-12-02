import React, { Component } from 'react';
import './App.css';
import Game from './components/Game';
import JoinGame from './components/JoinGame';
import Menu from './components/Menu';
import NewGame from './components/NewGame';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    //console.log(this.props.game);
    return (
      <Router>
        <Switch>
            <Route exact path="/" component={Menu} />
            <Route path="/newGame" component={NewGame} />
            <Route path="/joinGame" component={JoinGame} />
            <Route path="/startGame/:token/:username" component={Game} /> 
        </Switch>
      </Router> 
    );
  }
}

export default App;