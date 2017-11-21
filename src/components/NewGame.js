import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewGame extends Component {


    render() {
        return <div className="new-game-block">
                <input className="new-game-block__input" placeholder="Username"/>
                <input className="new-game-block__input" placeholder="Size of Game Field" />
                <Link to="/startGame"><button className="nav">Start Game</button></Link>
            </div>;
    }
}

export default NewGame;