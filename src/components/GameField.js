import React, {Component} from 'react';
import Square from './Square';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeMove, getState } from '../AC';

class GameField extends Component{

    constructor(props){
        super(props);
        setInterval(() => {
            this.props.getState();
        }, 4000);
    }

    state = {
        current_state: [],
        player: 1,
        winner_combination: [],
        winner: 0,
        elapsed: 0,
    }


    componentDidMount(){
        const { size } = this.props;
        var temp_state = this.fillZero();

        for(let i = 0; i < size; i++){
            for(let j = 0; j < size; j++){
                temp_state[i][j] = ' ';
            }
        }
        
        this.setState({current_state: temp_state});

        /* winner combination */

        /* diagonal */
        let temp_arr = this.fillZero();
        let temp_winner_arr = [];
        for(let i = 0; i < size; i++){
            for(let j = 0; j < size; j++){
                if(i === j)
                    temp_arr[i][j] = 1;
            }
        }
        temp_winner_arr.push(temp_arr);
        temp_arr = this.fillZero();

        /* diagonal */
        for(let i = 0; i < size; i++){
            for(let j = 0; j < size; j++){
                if((size - 1) - i === j)
                    temp_arr[i][j] = 1;
            }
        }
        temp_winner_arr.push(temp_arr);
        temp_arr = this.fillZero();

        /* gorizontal */
        for(let i = 0; i < size; i++){
            for(let j = 0; j < size; j++){
                temp_arr[i][j] = 1;
            }
            temp_winner_arr.push(temp_arr);
            temp_arr = this.fillZero();
        }

        /* vertical */
        temp_arr = this.fillZero();
        for(let i = 0; i < size; i++){
            for(let j = 0; j < size; j++){
                    temp_arr[j][i] = 1;
            }
            temp_winner_arr.push(temp_arr);
            temp_arr =this.fillZero();
        }
        this.setState({winner_combination: temp_winner_arr});

        if(this.props.game[this.props.token].current_field && this.props.game[this.props.token].current_field.length){
            this.setState({current_state: this.props.game[this.props.token].current_field});

            // this.checkWinner(this.state.player);
        }
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
        let curr_sign = this.state.player === 1 ? 'X' : 'O'
        if(this.state.winner === 0){
            if(this.state.current_state[row][col] === ' '){
                var field = this.state.current_state;
                field[row][col] = curr_sign;
                this.setState({current_state: field, player: this.state.player === 1 ? 2 : 1});
                this.checkWinner(this.state.player);
            }
        }  
        
        this.props.makeMove(this.props.token, row, col, curr_sign);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.game[this.props.token].current_field){
            this.setState({current_state: nextProps.game[this.props.token].current_field});
            this.checkWinner(this.state.player);
        }
    }

    checkWinner(player){
        const { size } = this.props;
        const cur_sign = player === 1 ? 'X' : 'O';
        const cur_state = this.state.current_state;
        const combination = this.state.winner_combination;

        
        combination.forEach(combination => {
            let winner_exist = 1
            for ( let i = 0; i < size; i++){
                for ( let j = 0; j < size; j++){
                    if (combination[i][j] === 1) {
                        if (cur_state[i][j] === cur_sign){
                            winner_exist = winner_exist * 1;
                        }else{
                            winner_exist = winner_exist * 0;
                        }
                    }
                }
            }
            
            
            if(winner_exist === 1){
                this.setState({winner: player})
                return true;
            }
        });
        return false;
    }


    render(){
        const winner = this.state.winner !== 0 ? 'Player ' + (this.state.winner) + ' win' : '';
        const squares = [];
        console.log(this.state.winner);

        const { size } = this.props;

        if(this.state.current_state[0]){    
            for(let i = 0; i < size; i++){
                for(let j = 0; j < size; j++){
                    squares.push(
                    <Square 
                        key={i*size + j} row={i} col={j}
                        handleClick={this.handleClick.bind(this)} 
                        val={this.state.current_state[i][j]}
                        squaresWidth={100/size}
                    />)
                }
            }
        }


        return <div className="field">
            <div className="game-block">
                {squares}
                {this.state.winner !== 0 ? <div className='winner-field'>{winner}</div> : ''}
            </div>
        </div> ;
    }
}

GameField.PropTypes = {
    vsComputer: PropTypes.bool,
    size: PropTypes.string,
}

export default connect (
    state => ({
        game: state.game,
    }),
    { makeMove, getState }
)(GameField);
