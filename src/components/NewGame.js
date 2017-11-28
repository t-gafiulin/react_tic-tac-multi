import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createGame } from '../AC';

class NewGame extends Component {
    state = {
        username: "",
        size: "",
        token: "",
    }

    componentWillMount(){
        let new_token = this.generateToken(8);
        this.setState({token: new_token})
    }

    handleChange(param, event){
        this.setState({[param]: event.target.value});
    }

    handleClick(){
        const { username, size, token } = this.state;
        this.props.createGame(username, size, token);
    }

    generateToken(length) {
        var a = "abcdefghijklmnopqrstuvwxyz1234567890".split("");
        var b = [];  
        for (var i=0; i<length; i++) {
            var j = (Math.random() * (a.length-1)).toFixed(0);
            b[i] = a[j];
        }
        return b.join("");
    };

    render() {
        const { username, token } = this.state;
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
                <Link to={`/startGame/${token}/${username}`}>
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