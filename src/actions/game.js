export const RECEIVE_GAME_DATA = "RECEIVE_GAME_DATA";

export function receiveGameData(game) {
    return {
        type: RECEIVE_GAME_DATA,
        game
    }
}