import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <div>
        <button><Link to="/newGame">New Game</Link></button>
        <button><Link to="/joinGame">Join Game</Link></button>
      </div>
    );
  }
}

export default Menu;