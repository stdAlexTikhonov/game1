import { RECEIVE_HUNTER } from '../actions/hunter';

export default function users (state = {}, action) {
    switch (action.type) {
        case RECEIVE_HUNTER:
            return {
                ...state,
                ...action.hunter
            }
        default:
            return state;
    }
}