import React, {Component} from 'react';
import Square from './Square';
import PropTypes from "prop-types";

class GameField extends Component{

    state = {
        current_state: [],
        player: 1,
        winner_combination: [],
        winner: 0
    }


    componentDidMount(){
        const { size } = this.props;
        let temp_state = [];

        for(let i = 0; i < size * size; i++)
            temp_state.push(' ');

        this.setState({current_state: temp_state});

        let temp_arr = [];
        let temp_winner_arr = []
        for(var i = 0; i < size; i++){
            for(var j = 0; j < size; j++){
                if(i === j)
                    temp_arr.push(i + size*j);
            }
        }
        temp_winner_arr.push(temp_arr);
        temp_arr = [];

        for(let i = 0; i < size; i++){
            for(let j = 0; j < size; j++){
                if((size - 1) - i === j)
                    temp_arr.push(i + size*j);
            }
        }
        temp_winner_arr.push(temp_arr.reverse());
        temp_arr = [];

        for(let i = 0; i < size; i++){
            for(let j = 0; j < size; j++){
                temp_arr.push(size*i + j);
            }
            temp_winner_arr.push(temp_arr);
            temp_arr = [];
        }

        for(let i = 0; i < size; i++){
            for(let j = 0; j < size; j++){
                    temp_arr.push(i + size*j);
            }
            temp_winner_arr.push(temp_arr);
            temp_arr = [];
        }
        this.setState({winner_combination: temp_winner_arr});
    }

    handleClick(index){
        if(this.state.winner === 0){
            if(this.state.current_state[index] === ' '){
                var field = this.state.current_state;
                field[index] = this.state.player === 1 ? 'X' : 'O';
                this.setState({current_state: field, player: this.state.player === 1 ? 2 : 1});
                this.checkWinner(this.state.player);
            }
        
        }    
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }

    checkWinner(player){
        const cur_sign = player === 1 ? 'X' : 'O';
        const cur_state = this.state.current_state;
        const combination = this.state.winner_combination;
        for(let i = 0; i < this.state.winner_combination.length; i++){
            let winner_exist = 1;
            for( var j = 0; j < this.props.size; j++){
                if(cur_state[combination[i][j]] === cur_sign){
                    winner_exist = winner_exist * 1;
                }else{
                    winner_exist = winner_exist * 0;
                }
            }

            if(winner_exist === 1){
                this.setState({winner: player})
                return true;
            }
                
        }
        return false;
    }


    render(){
        const winner = this.state.winner !== 0 ? 'Player ' + (this.state.winner) + ' win' : '';
        const squares = [];

        const { size } = this.props;

        for(let i = 0; i < size * size; i++){
            squares.push(<Square key={i}
            index={i} 
            handleClick={this.handleClick.bind(this)} 
            val={(this.state.current_state[i])}
            squaresWidth={100/size}
            />)
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

export default GameField;