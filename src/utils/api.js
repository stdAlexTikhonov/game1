import {
    _getUsers,
    _getInitState,
    _saveGame,
  } from './_DATA.js'
  
  export function getInitialData () {
    return Promise.all([
      _getUsers(),
      _getInitState(),
    ]).then(([users, game]) => ({
      users,
      game,
    }))
  }
  

  
  export function saveGame (info) {
    return _saveGame(info)
  }