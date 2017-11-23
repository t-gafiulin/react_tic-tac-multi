import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GameField extends Component {

    render() {
        const params = this.props.match.params;
        console.log(params);

        return <div className="gamefield-block">
            <div>{params.param}</div>
            <Link to="/"><button className="nav">Exit Game</button></Link>

        </div>;
    }
}

export default GameField;