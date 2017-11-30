import React, {Component} from 'react';
import Square from './Square';
import { connect } from 'react-redux';
import { makeMove, getState, setWinner } from '../AC';

class GameField extends Component{

    constructor(props){
        super(props);
        setInterval(() => {
            this.props.getState();
        }, 4000);
    }

    fillZero(){
        const { size } = this.props;
        const temp_arr = [];
        for(let i = 0; i < size; i++){
            temp_arr[i] = []
            for(let j = 0; j < size; j++){
                    temp_arr[i][j] = 0;
            }
        }

        return temp_arr;
    }

    handleClick(row, col){  
        if (!this.props.game[this.props.token].winner) {
            this.props.makeMove(this.props.token, row, col, this.props.username);
            this.checkWinner(row, col);
        }
    }

    checkWinner(row, col){
        const { size, username, setWinner, game, token } = this.props;
        const cur_sign = username === game[token].create_username ? 'X' : 'O';
        const cur_state = this.props.game[token].current_field;
        cur_state[row][col] = cur_sign;

        let winner_col = 1, winner_row = 1;
        for ( let i = 0; i < size; i++){
            if(cur_state[i][col] !== cur_sign){
                winner_col *= 0;
            }
        }

        for ( let i = 0; i < size; i++){
            if(cur_state[row][i] !== cur_sign){
                winner_row *= 0;
            }
        }  

        let winner_diagonal_1 = 0;
        if(row === col){
            winner_diagonal_1 = 1;  
            for ( let i = 0; i < size; i++){
                if(cur_state[i][i] !== cur_sign){
                    winner_diagonal_1 *= 0;
                }
            }
        }

        let winner_diagonal_2 = 0;  
        if(row === (size - 1) - col){  
            winner_diagonal_2 = 1;  
            for ( let i = 0; i < size; i++){
                if(cur_state[i][size - 1 - i] !== cur_sign){
                    winner_diagonal_2 *= 0;
                }
            }
        }

        if(winner_col || winner_row || winner_diagonal_1 || winner_diagonal_2)
            setWinner(username, token);

        return;
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
                {game[token].winner ? <div className='winner-field'>{'Player ' + (game[token].winner) + ' win'}</div> : ''}
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
