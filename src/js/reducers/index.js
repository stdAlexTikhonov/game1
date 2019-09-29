const app = (state = {}, action) => {
    return {
        player: playerReducer(state.player, action),
        game: gameReducer(state.game, action),
        hunter: hunterReducer(state.hunter,action),
        timeline: timelineReducer(state.timeline, action)
    }
}