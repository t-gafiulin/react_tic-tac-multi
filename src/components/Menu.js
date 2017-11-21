import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <div className="nav-block">
        <Link to="/newGame"><button className="nav">New Game</button></Link>
        <Link to="/joinGame"><button className="nav">Join Game</button></Link>
      </div>
    );
  }
}

export default Menu;