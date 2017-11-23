import { CREATE_GAME, JOIN_GAME } from '../constants';

const initialState = {
    '123abc': {
        create_username: '',
        join_username: '',
        size_gamefield: ''  
    },
}

export default function game ( state = initialState, action ){
    const { type, payload } = action;

    switch ( type ){
        case CREATE_GAME:{
            let token = generateToken;
            const { username, size } = payload;

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


function generateToken() {
    return Math.random().toString(36).substr(2);
};