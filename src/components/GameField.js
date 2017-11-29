import React, {Component} from 'react';
import Square from './Square';
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
        winner: 0,
        elapsed: 0,
    }


    componentDidMount(){
        const { size, token, game } = this.props;
        var temp_state = this.fillZero();

        for(let i = 0; i < size; i++){
            for(let j = 0; j < size; j++){
                temp_state[i][j] = ' ';
            }
        }
        
        this.setState({current_state: temp_state});

        if(game[token].current_field && game[token].current_field.length){
            this.setState({current_state: game[token].current_field});
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
        if (this.state.winner == 0) {
            this.props.makeMove(this.props.token, row, col, this.props.username);
            this.checkWinner(row, col);
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.game[this.props.token].current_field){
            this.setState({current_state: nextProps.game[this.props.token].current_field});
        }
    }

    checkWinner(row, col){
        
        const { size } = this.props;
        const cur_sign = this.props.username === this.props.game[this.props.token].create_username ? 'X' : 'O';
        const cur_state = this.state.current_state;
        cur_state[row][col] = cur_sign;

        let winner_col = 1, winner_row = 1;
        for ( let i = 0; i < size; i++){
            if(cur_state[i][col] !== cur_sign){
                winner_col *= 0;
            }
        }
        if(winner_col){
            this.setState({winner: this.props.username})
            return true;
        }

        for ( let i = 0; i < size; i++){
            if(cur_state[row][i] !== cur_sign){
                winner_row *= 0;
            }
        }
        if(winner_row){
            this.setState({winner: this.props.username})
            return true;
        }   

        
        if(row === col){
            let winner_diagonal = 1    
            for ( let i = 0; i < size; i++){
                if(cur_state[i][i] !== cur_sign){
                    winner_diagonal *= 0;
                }
            }
            if(winner_diagonal){
                this.setState({winner: this.props.username})
                return true;
            }
        }

        if(row === (size - 1) - col){
            let winner_diagonal = 1    
            for ( let i = 0; i < size; i++){
                if(cur_state[i][size - 1 - i] !== cur_sign){
                    winner_diagonal *= 0;
                }
            }
            if(winner_diagonal){
                this.setState({winner: this.props.username})
                return true;
            }
        }
        return false;
    }

    render(){
        const winner = this.state.winner !== 0 ? 'Player ' + (this.state.winner) + ' win' : '';
        const squares = [];

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

export default connect (
    state => ({
        game: state.game,
    }),
    { makeMove, getState }
)(GameField);
