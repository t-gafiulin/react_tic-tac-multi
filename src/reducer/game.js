import { CREATE_GAME, JOIN_GAME } from '../constants';

const initialState = getItemLocalStorage() ? 
                        getItemLocalStorage() : 
                        {};

export default function game ( state = initialState, action ){
    const { type, payload } = action;

    switch ( type ){
        case CREATE_GAME:{
            const { username, size, token } = payload;

            const new_state = {
                ...state,
                [token]: {
                    ...state[token],
                    create_username: username, 
                    size_gamefield: size
                }
            }
            setItemLocalStorage(new_state);

            return new_state;
        }
        case JOIN_GAME:{
            const { username, token } = payload;

            const new_state = {
                ...state,
                [token]: {
                    ...state[token],
                    join_username: username, 
                }
            }

            if(state[token]){
                setItemLocalStorage(new_state);
                return new_state;
            }
        }
        default:
            return state;
    }
}


function setItemLocalStorage(gameState){
    let serialGameState = JSON.stringify(gameState);
    localStorage.setItem('gameState', serialGameState);
}

function getItemLocalStorage(){
    return JSON.parse(localStorage.getItem('gameState'));
}