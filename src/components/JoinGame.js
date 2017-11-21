import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class JoinGame extends Component {
    render() {
        return <div>
                <input placeholder="Username"/>
                <input placeholder="Game token" />
                <button><Link to="/startGame">Start Game</Link></button>
            </div>;
    }
}

export default JoinGame;