import React, { Component } from 'react';
import NewGame from './NewGame';
import JoinGame from './JoinGame';

class Menu extends Component {
  render() {
    return (
      <div>
        <NewGame />
        <JoinGame />
      </div>
    );
  }
}

export default Menu;