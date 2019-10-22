import { RECEIVE_PLAYER } from '../actions/player';

export default function users (state = {}, action) {
    switch (action.type) {
        case RECEIVE_PLAYER:
            return {
                ...state,
                ...action.player
            }
        default:
            return state;
    }
}