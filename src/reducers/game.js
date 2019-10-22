import { RECEIVE_GAME_DATA } from '../actions/game';

export default function game (state = {}, action) {
    switch (action.type) {
        case RECEIVE_GAME_DATA:
            return {
                ...state,
                ...action.game
            }
        default:
            return state;
    }
}