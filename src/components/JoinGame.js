import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class JoinGame extends Component {
    render() {
        return <div className="join-game-block">
                <input className="join-game-block__input" placeholder="Username"/>
                <input className="join-game-block__input" placeholder="Game token" />
                <Link to="/startGame"><button className="nav">Start Game</button></Link>
            </div>;
    }
}

export default JoinGame;