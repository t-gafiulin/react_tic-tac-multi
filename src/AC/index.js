import { CREATE_GAME, JOIN_GAME } from '../constants';

export function createGame(username, size){
    return {
        type: CREATE_GAME,
        size: size,
        username: username,
    }
}

export function joinGame(username, game_token){
    return {
        type: JOIN_GAME,
        username: username,
        token: game_token,
    }
}