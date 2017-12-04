import { CREATE_GAME, JOIN_GAME, MAKE_A_MOVE, GET_STATE } from '../constants';

const initialState = getItemLocalStorage() ? getItemLocalStorage() : {};

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
                    turn: username,
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
            if(new_state[token] && !new_state[token].join_username){
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
            const { token, row, col, username } = payload;
        
            let new_state = getItemLocalStorage();
            if(username === new_state[token].turn){
                if(!new_state[token].current_field[row][col] || new_state[token].current_field[row][col] === ' '){
                    let curr_field = new_state[token].current_field;
                    let condition = username === new_state[token].create_username
                    let next_turn = condition ? new_state[token].join_username : new_state[token].create_username;
                    let winner = checkWinner(row, col, username, curr_field) ? username : false;
                    curr_field[row][col] = (condition ? 'X' : 'O');
                    new_state = {
                        ...new_state,
                        [token]: {
                            ...new_state[token],
                            turn: next_turn,
                            current_field: curr_field,
                            winner: winner,
                        }
                    }
                }
                setItemLocalStorage(new_state);
            }

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

function checkWinner(row, col, username, token, state){
    let size = state[token].current_field.length;
    const cur_sign = username ? 'X' : 'O';
    const cur_state = state[token].current_field;
    cur_state[row][col] = cur_sign;
    

    let winner_col = 1, winner_row = 1, winner_diagonal_1 = 0, winner_diagonal_2 = 0;;
    for ( let i = 0; i < size; i++){
        if(cur_state[i][col] !== cur_sign){
            winner_col *= 0;
        }
    }

    for ( let i = 0; i < size; i++){
        if(cur_state[row][i] !== cur_sign){
            winner_row *= 0;
        }
    }  

    if(row === col){
        winner_diagonal_1 = 1;  
        for ( let i = 0; i < size; i++){
            if(cur_state[i][i] !== cur_sign){
                winner_diagonal_1 *= 0;
            }
        }
    }

    if(row === (size - 1) - col){  
        winner_diagonal_2 = 1;  
        for ( let i = 0; i < size; i++){
            if(cur_state[i][size - 1 - i] !== cur_sign){
                winner_diagonal_2 *= 0;
            }
        }
    }

    if(winner_col || winner_row || winner_diagonal_1 || winner_diagonal_2)
        return true;

    return false;
}