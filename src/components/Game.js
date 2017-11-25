import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GameField from './GameField';

class Game extends Component {

    render() {
        const params = this.props.match.params;
        console.log(this);

        const { create_username, join_username, size_gamefield } = this.props.game[params.token];

        return <div>
            <div className="gamefield-block">
                <div>Creator: { create_username }</div>
                <div>Join: { join_username }</div>
                <div>Size: { size_gamefield }</div>
                <div>Game token: { params.token }</div>
                <Link to="/"><button className="nav">Exit Game</button></Link>
            </div>
            <GameField size={3}/>
        </div>;
    }
}

export default connect (
    state => ({
        game: state.game,
    })
)(Game);

