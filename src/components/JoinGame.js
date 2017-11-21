import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class JoinGame extends Component {
    render() {
        return <div>
                <input placeholder="Username"/>
                <input placeholder="Game token" />
                <Link to="/startGame"><button className="nav">Start Game</button></Link>
            </div>;
    }
}

export default JoinGame;