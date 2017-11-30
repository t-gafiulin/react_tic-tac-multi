import { CREATE_GAME, JOIN_GAME, MAKE_A_MOVE, GET_STATE, SET_WINNER } from '../constants';

export function createGame(username, size, token){
    return {
        type: CREATE_GAME,
        payload: {
            size: size,
            username: username,
            token: token,
        }
    }
}

export function joinGame(username, game_token){
    return {
        type: JOIN_GAME,
        payload: {
            username: username,
            token: game_token,
        }
    }
}

export function makeMove(token, row, col, username){
    return {
        type: MAKE_A_MOVE,
        payload: {
            token: token,
            row: row,
            col: col,
            username: username,
        }
    }
}

export function getState(){
    return {
        type: GET_STATE,
    }
}

export function setWinner(winner, token) {
    return {
        type: SET_WINNER,
        payload: {
            winner: winner,
            token: token,
        }
    }
}