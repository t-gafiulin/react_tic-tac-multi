import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GameField extends Component {

    render() {
        return <div>
            <div>Game Field</div>
            <button><Link to="/">Exit Game</Link></button>

        </div>;
    }
}

export default GameField;