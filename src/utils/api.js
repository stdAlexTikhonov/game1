import {
    _getUsers,
    _getInitGame,
    _saveGame,
    _getInitHunter,
    _getInitPlayer
  } from './_DATA.js'
  
  export function getInitialData () {
    return Promise.all([
      _getUsers(),
      _getInitGame(),
      _getInitHunter(),
      _getInitPlayer()
    ]).then(([users, game, hunter, player]) => ({
      users,
      game,
      hunter,
      player
    }))
  }
  

  
  export function saveGame (info) {
    return _saveGame(info)
  }