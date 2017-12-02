import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameField from './GameField';
import './css/Game.css';

class Game extends Component {

    render() {
        const params = this.props.match.params;

        const { create_username, join_username, size_gamefield } = this.props.game[params.token];

        return <div className="game">
            <GameField size={size_gamefield} token={params.token} username={params.username}/>
            <div className="gameinfo-block">
                <div>Creator: { create_username }</div>
                <div>Join: { join_username }</div>
                <div>Size: { size_gamefield }</div>
                <div>Game token: { params.token }</div>
            </div>
        </div>;
    }
}

export default connect (
    state => ({
        game: state.game,
    })
)(Game);

