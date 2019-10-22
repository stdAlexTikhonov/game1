import { combineReducers } from 'redux';
import authedUser from './authedUser';
import users from './users';
import game from './game';
import hunter from './hunter';
import player from './player';

export default combineReducers({
    authedUser,
    users,
    game,
    hunter,
    player
})