import { CREATE_GAME, JOIN_GAME } from '../constants';

const initialState = (sessionStorage.getItem('game')) ? 
                        JSON.parse(sessionStorage.getItem('game')) : 
                        {};

// var q = {b: 3,c: 4}
// var serialq = JSON.stringify(q)
// sessionStorage.setItem('a', serialq)
// var returnq = JSON.parse(sessionStorage.getItem('a'));
// console.log(returnq.c);

export default function game ( state = initialState, action ){
    const { type, payload } = action;

    switch ( type ){
        case CREATE_GAME:{
            const { username, size, token } = payload;

            return {
                ...state,
                [token]: {
                    ...state[token],
                    create_username: username, 
                    size_gamefield: size
                }
            }
        }
        case JOIN_GAME:{
            const { username, token } = payload;
            if(state[token])
                return {
                    ...state,
                    [token]: {
                        ...state[token],
                        join_username: username, 
                    }
                }
        }
        default:
            return state;
    }
}