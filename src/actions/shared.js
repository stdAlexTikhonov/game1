import { getInitialData } from '../utils/api';
import { receiveUsers } from './users';
import { receiveGameData } from './game';
import { setAuthedUser } from './authedUser';
import { receivePlayer } from './player';
import { receiveHunter } from './hunter';

const AUTHED_ID = 'tylermcginnis'

export function handleInitialData() {
    return dispatch => {
        return getInitialData()
            .then(({ users, game, hunter, player}) => {
                dispatch(receiveUsers(users));
                dispatch(receiveGameData(game));
                dispatch(receivePlayer(player));
                dispatch(receiveHunter(hunter));
                dispatch(setAuthedUser(AUTHED_ID));
            })
    }
}