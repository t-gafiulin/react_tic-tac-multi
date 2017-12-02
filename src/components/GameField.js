import React, {Component} from 'react';
import Square from './Square';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeMove, getState, setWinner } from '../AC';

class GameField extends Component{

    constructor(props){
        super(props);
        setInterval(() => {
            this.props.getState();
        }, 4000);
    }

    handleClick(row, col){  
        if (!this.props.game[this.props.token].winner) {
            this.props.makeMove(this.props.token, row, col, this.props.username);
        }
    }

    render(){
        const { size, token, game } = this.props;
        const squares = [];
        let current_state = game[token].current_field;

        if(current_state[0]){    
            for(let i = 0; i < size; i++){
                for(let j = 0; j < size; j++){
                    squares.push(
                    <Square 
                        key={i*size + j} row={i} col={j}
                        handleClick={this.handleClick.bind(this)} 
                        val={current_state[i][j]}
                        squaresWidth={100/size}
                    />)
                }
            }
        }

        return <div className="field">
            <div className="game-block">
                {squares}
                {game[token].winner ? 
                    <div>
                        <div className='winner-field'>{'Player ' + (game[token].winner) + ' win'}</div>
                        <Link to="/"><button className="nav exit-block">Exit Game</button></Link>
                    </div>
                     : ''}
            </div>
        </div> ;
    }
}

export default connect (
    state => ({
        game: state.game,
    }),
    { makeMove, getState, setWinner }
)(GameField);
