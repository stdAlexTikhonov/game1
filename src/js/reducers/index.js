const app = (state = {}, action) => {
    return {
        player: playerReducer(state.player, action),
        game: gameReducer(state.game, action),
        hunter: hunterReducer(state.hunter,action),
        hunter2: hunterReducer2(state.hunter2, action),
        hunter3: hunterReducer3(state.hunter3, action)
    }
}