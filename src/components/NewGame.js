import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createGame } from '../AC';

class NewGame extends Component {
    state = {
        username: "",
        size: ""
    }

    handleChange(param, event){
        this.setState({[param]: event.target.value});
    }

    handleClick(){
        const { username, size } = this.state;
        this.props.createGame(username, size);
    }

    render() {
        return <div className="new-game-block">
                <input 
                    className="new-game-block__input" 
                    placeholder="Username"
                    onChange={this.handleChange.bind(this, "username")}
                />
                <input 
                    className="new-game-block__input" 
                    placeholder="Size of Game Field"
                    onChange={this.handleChange.bind(this, "size")}
                />
                <Link to={"/startGame/" + this.state.username}>
                    <button 
                        className="nav" 
                        onClick={this.handleClick.bind(this)}
                    >    
                    Start Game     
                    </button>
                </Link>
            </div>;
    }
}

export default connect(
    null,
    { createGame }
)(NewGame);