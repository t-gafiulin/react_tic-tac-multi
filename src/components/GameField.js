import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class GameField extends Component {

    render() {
        const params = this.props.match.params;

        const { create_username, join_username, size_gamefield } = this.props.game[params.token];
        //console.log(this.props.game[params.token], this.props.game,  params.token);

        return <div className="gamefield-block">
            <div>Creator: { create_username }</div>
            <div>Join: { join_username }</div>
            <div>Size: { size_gamefield }</div>
            <div>Game token: { params.token }</div>
            <Link to="/"><button className="nav">Exit Game</button></Link>

        </div>;
    }
}

//export default GameField;

export default connect (
    state => ({
        game: state.game,
    })
)(GameField);

