import { CREATE_GAME, JOIN_GAME, MAKE_A_MOVE } from '../constants';

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

export function makeMove(token, current_field){
    return {
        type: MAKE_A_MOVE,
        payload: {
            token: token,
            current_field: current_field,
        }
    }
}