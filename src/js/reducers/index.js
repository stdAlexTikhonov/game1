const app = (state = {}, action) => {
    return {
        player: player(state.player, action),
        game: game(state.game, action),
        ghost1: ghost1(state.ghost1,action)
    }
}