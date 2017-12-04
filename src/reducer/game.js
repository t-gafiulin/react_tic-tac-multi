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
                    let winner = checkWinner(row, col, username, new_state[token]) ? username : false;    
                    curr_field[row][col] = (condition ? 'X' : 'O');
                    if(!winner)
                        winner = checkDraw(curr_field) ? 'draw' : false;
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

function checkDraw(curr_state){
    for ( let i = 0; i < curr_state.length; i++) {
        for ( let j = 0; j < curr_state.length; j++) {
            if(curr_state[i][j] === ' ')
                return false;
        }
    }
    console.log('draw');
    return true;
}

function checkWinner(row, col, username, current_state){
    const curr_state = current_state.current_field;
    const size = curr_state.length;
    const curr_sign = username === current_state.create_username ? 'X' : 'O';
    curr_state[row][col] = curr_sign;
    

    let winner_col = 1, winner_row = 1, winner_diagonal_1 = 0, winner_diagonal_2 = 0;;
    for ( let i = 0; i < size; i++){
        if(curr_state[i][col] !== curr_sign){
            winner_col *= 0;
        }
    }

    for ( let i = 0; i < size; i++){
        if(curr_state[row][i] !== curr_sign){
            winner_row *= 0;
        }
    }  

    if(row === col){
        winner_diagonal_1 = 1;  
        for ( let i = 0; i < size; i++){
            if(curr_state[i][i] !== curr_sign){
                winner_diagonal_1 *= 0;
            }
        }
    }

    if(row === (size - 1) - col){  
        winner_diagonal_2 = 1;  
        for ( let i = 0; i < size; i++){
            if(curr_state[i][size - 1 - i] !== curr_sign){
                winner_diagonal_2 *= 0;
            }
        }
    }

    if(winner_col || winner_row || winner_diagonal_1 || winner_diagonal_2)
        return true;

    return false;
}