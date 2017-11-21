import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewGame extends Component {


    render() {
        return <div>
                <input placeholder="Username"/>
                <input placeholder="Size of Game Field" />
                <button><Link to="/startGame">Start Game</Link></button>
            </div>;
    }
}

export default NewGame;