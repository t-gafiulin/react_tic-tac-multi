import { CREATE_GAME, JOIN_GAME, MAKE_A_MOVE, GET_STATE } from '../constants';

const initialState = getItemLocalStorage() ? 
                        getItemLocalStorage() : 
                        {};
// /const initialState = {};

export default function game ( state = initialState, action ){
    const { type, payload } = action;

    switch ( type ){
        case CREATE_GAME:{
            const { username, size, token } = payload;

            let new_state = getItemLocalStorage();
            new_state = {
                ...new_state,
                [token]: {
                    ...new_state[token],
                    create_username: username, 
                    size_gamefield: size,
                    current_field: createFirstState(size)
                }
            }
            setItemLocalStorage(new_state);

            return new_state;
        }
        case JOIN_GAME:{
            const { username, token } = payload;

            let new_state = getItemLocalStorage();
            if(new_state[token]){
                new_state = {
                    ...new_state,
                    [token]: {
                        ...new_state[token],
                        join_username: username, 
                    }
                }
                setItemLocalStorage(new_state);
                return new_state;
            }else{
                return state;
            }
            
        }
        case MAKE_A_MOVE:
            const { token, row, col, sign } = payload;
        
            let new_state = getItemLocalStorage();

            if(!new_state[token].current_field[row][col] || new_state[token].current_field[row][col] === ' '){
                let curr_field = new_state[token].current_field;
                curr_field[row][col] = sign;
                new_state = {
                    ...new_state,
                    [token]: {
                        ...new_state[token],
                        current_field: curr_field
                    }
                }
            }
            setItemLocalStorage(new_state);

            return new_state;

        case GET_STATE: {
            let new_state = getItemLocalStorage();
            return new_state;
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

function createFirstState(size){
    const temp_arr = [];
    for(let i = 0; i < size; i++){
        temp_arr[i] = []
        for(let j = 0; j < size; j++){
                temp_arr[i][j] = ' ';
        }
    }

    return temp_arr;
}