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
            const { username, size } = payload;

            return {
                ...state,
                ['123abc']: {
                    ...state['123abc'],
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
                    ['123abc']: {
                        ...state['123abc'],
                        join_username: username, 
                    }
                }
        }
        default:
            return state;
    }
}