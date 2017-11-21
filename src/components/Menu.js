import React, { Component } from 'react';
import {Link } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <div>
        <Link to="/newGame"><nav>New Game</nav></Link>
        <Link to="/joinGame"><nav>Join Game</nav></Link>
      </div>
    );
  }
}

export default Menu;