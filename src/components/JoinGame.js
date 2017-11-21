import React, { Component } from 'react';

class JoinGame extends Component {


    render() {
        return <div>
                <input placeholder="Username"/>
                <input placeholder="Game token" />
                <button>JoinGame</button>
            </div>;
    }
}

export default JoinGame;