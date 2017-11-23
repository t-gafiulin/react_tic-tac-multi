import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class JoinGame extends Component {
    state = {
        username: "",
        game_token: ""
    }

    handleChange(param, event){
        this.setState({[param]: event.target.value});
    }

    handleClick(){
        console.log(this.state.username, this.state.game_token);
    }

    render() {
        return <div className="join-game-block">
                <input 
                    className="join-game-block__input" 
                    placeholder="Username"
                    onChange={this.handleChange.bind(this, "username")}
                />
                <input 
                    className="join-game-block__input" 
                    placeholder="Game token" 
                    onChange={this.handleChange.bind(this, "game_token")}
                />
                <Link to="/startGame">
                    <button 
                        className="nav" 
                        onClick={this.handleClick.bind(this)}
                    >    
                    Join Game     
                    </button>
                </Link>
            </div>;
    }
}

export default JoinGame;