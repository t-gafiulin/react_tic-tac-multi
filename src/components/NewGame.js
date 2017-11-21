import React, { Component } from 'react';

class NewGame extends Component {


    render() {
        return <div>
                <input placeholder="Username"/>
                <input placeholder="Size of Game Field" />
                <button>Start Game</button>
            </div>;
    }
}

export default NewGame;