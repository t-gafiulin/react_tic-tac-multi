import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Menu extends Component {
  render() {
    return (
      <div>
        <div className="nav-block">
          <Link to="/newGame"><button className="nav">New Game</button></Link>
          <Link to="/joinGame"><button className="nav">Join Game</button></Link>
        </div>
      </div>
      
    );
  }
}

export default connect(
  state => ({
    state: state,
  })
)(Menu);