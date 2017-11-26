import React, {Component} from 'react';
import Square from './Square';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeMove } from '../AC';

class GameField extends Component{

    constructor(props){
        super(props);
        // setInterval(() => {
        //     console.log('props', props.game[props.token]);
        //     console.log(this.state.current_state);
        //     this.props.makeMove(this.props.token, this.state.current_state);
        // }, 4000);
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
        var temp_state = [];

        for(var i = 0; i < size; i++){
            temp_state[i] = [];
            for(var j = 0; j < size; j++){
                temp_state[i][j] = ' ';
            }
        }
        
        console.log(temp_state);
        this.setState({current_state: temp_state});
        // /console.log(temp_state);


        /* winner combination */

        // let temp_arr = [];
        // let temp_winner_arr = []
        // for(var i = 0; i < size; i++){
        //     for(var j = 0; j < size; j++){
        //         if(i === j)
        //             temp_arr.push(i + size*j);
        //     }
        // }
        // temp_winner_arr.push(temp_arr);
        // temp_arr = [];

        // for(let i = 0; i < size; i++){
        //     for(let j = 0; j < size; j++){
        //         if((size - 1) - i === j)
        //             temp_arr.push(i + size*j);
        //     }
        // }
        // temp_winner_arr.push(temp_arr.reverse());
        // temp_arr = [];

        // for(let i = 0; i < size; i++){
        //     for(let j = 0; j < size; j++){
        //         temp_arr.push(size*i + j);
        //     }
        //     temp_winner_arr.push(temp_arr);
        //     temp_arr = [];
        // }

        // for(let i = 0; i < size; i++){
        //     for(let j = 0; j < size; j++){
        //             temp_arr.push(i + size*j);
        //     }
        //     temp_winner_arr.push(temp_arr);
        //     temp_arr = [];
        // }
        // this.setState({winner_combination: temp_winner_arr});


        // if(this.props.game[this.props.token].current_field && this.props.game[this.props.token].current_field.length){
        //     this.setState({current_state: this.props.game[this.props.token].current_field});
        // }
    }

    handleClick(index){
        // if(this.state.winner === 0){
        //     if(this.state.current_state[index] === ' '){
        //         var field = this.state.current_state;
        //         field[index] = this.state.player === 1 ? 'X' : 'O';
        //         this.setState({current_state: field, player: this.state.player === 1 ? 2 : 1});
        //         //this.checkWinner(this.state.player);
        //     }
        
        // }  
        
        //this.props.makeMove(this.props.token, this.state.current_state);
    }

    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps');
        if(nextProps.game[this.props.token].current_field){
            this.setState({current_state: nextProps.game[this.props.token].current_field});
        }
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
    { makeMove }
)(GameField);
