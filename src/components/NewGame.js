import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewGame extends Component {
    state = {
        username: "",
        size: ""
    }

    handleChange(param, event){
        this.setState({[param]: event.target.value});
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
                <Link to="/startGame"><button className="nav">Start Game</button></Link>
            </div>;
    }
}

export default NewGame;