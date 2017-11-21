import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GameField extends Component {

    render() {
        return <div className="gamefield-block">
            <div>Game Field</div>
            <Link to="/"><button className="nav">Exit Game</button></Link>

        </div>;
    }
}

export default GameField;