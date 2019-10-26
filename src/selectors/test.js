import { createSelector } from 'reselect';

export const getMapSelector = state => state.game['8xf0y6ziyjabvozdd253nd'].map;

export const getHunter1Selector = state => state.hunter['8xf0y6ziyjabvozdd253nd'];

export const getHunter2Selector = state => state.hunter['8xf0y6ziyjabvozdd253n2'];

export const getHunter3Selector = state => state.hunter['8xf0y6ziyjabvozdd253n3'];

export const getPlayerSelector = state => state.player['8xf0y6ziyjabvozdd253nd'];

export const getUsersSelector = state => state.users;

export const getUserSelector = createSelector([getUsersSelector], users => users.dan_abramov);

export const getGameSelector = state => state.game["8xf0y6ziyjabvozdd253nd"];

