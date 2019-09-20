const app = (state = {}, action) => {
    return {
        player: player(state.player, action),
        game: game(state.game, action)
    }
}