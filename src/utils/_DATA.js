const users = {
    sarah_edo: {
      id: "sarah_edo",
      name: "Sarah Drasner",
      avatarURL: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
      initState: '8xf0y6ziyjabvozdd253nd',
    },
    tylermcginnis: {
      id: "tylermcginnis",
      name: "Tyler McGinnis",
      avatarURL: "https://tylermcginnis.com/would-you-rather/tyler.jpg",
      initState: '8xf0y6ziyjabvozdd253nd',
    },
    dan_abramov: {
      id: "dan_abramov",
      name: "Dan Abramov",
      avatarURL: "https://tylermcginnis.com/would-you-rather/dan.jpg",
      initState:  '8xf0y6ziyjabvozdd253nd',
    }
  }
  
  const initGame = {
    "8xf0y6ziyjabvozdd253nd": {
      pause: false,
      process: false,
      timer: 0,
      direction: null,
      index: 0,
      map: [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0],
        [0,1,0,1,0,1,0,1,0,0,1,0,1,0,1,1,1,1,0],
        [0,1,1,1,0,1,1,1,1,1,1,1,1,0,1,0,1,1,0],
        [0,1,0,1,0,1,0,1,0,0,1,0,1,1,1,0,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,1,0,1,1,0,0,0,1,0,0,1,0,1,0,1,1,0],
        [0,1,1,0,0,1,0,1,1,1,1,0,1,0,0,0,1,1,0],
        [0,1,1,1,1,1,0,1,1,1,1,0,1,1,1,0,1,1,0],
        [0,1,0,1,0,1,0,0,0,0,0,0,1,0,1,1,1,1,0],
        [0,1,1,1,0,1,1,1,1,1,1,1,1,0,1,0,1,1,0],
        [0,1,0,1,0,1,0,1,0,0,1,1,1,1,1,0,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ]
    }
  }

  const initHunter = {
    "8xf0y6ziyjabvozdd253nd": {
      x: 7,
      y: 7,
      path: [],
      history: [],
      currentStep: null,
      passedCells: [],
      alive: true
    },
    "8xf0y6ziyjabvozdd253n2": {
      x: 7,
      y: 7,
      path: [],
      history: [],
      currentStep: null,
      passedCells: [],
      alive: true
    },
    "8xf0y6ziyjabvozdd253n3": {
      x: 7,
      y: 7,
      path: [],
      history: [],
      currentStep: null,
      passedCells: [],
      alive: true
    }
  }

  const initPlayer = {
    "8xf0y6ziyjabvozdd253nd": {
      x: 1, 
      y: 1, 
      direction: null, 
      lastUserDirection: null,
      previousDirection: null,
      points: 0,
      turboscores: 10,
      isTurboActive: false,
      foodMap: ['11'],
      history: [],
      killer: false
    }
  }
  
  export function _getUsers () {
    return new Promise((res, rej) => {
      setTimeout(() => res({...users}), 1000)
    })
  }
  
  export function _getInitGame () {
    return new Promise((res, rej) => {
      setTimeout(() => res({...initGame}), 1000)
    })
  }

  export function _getInitHunter () {
    return new Promise((res, rej) => {
      setTimeout(() => res({...initHunter}), 1000)
    })
  }

  export function _getInitPlayer () {
    return new Promise((res, rej) => {
      setTimeout(() => res({...initPlayer}), 1000)
    })
  }
  
  
  
  function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
  
  function format ({ author, text, replyingTo = null }) {
    return {
      author,
      id: generateUID(),
      likes: [],
      replies: [],
      text,
      timestamp: Date.now(),
      replyingTo,
    }
  }
  
  export function _saveGame ({ text, author, replyingTo }) {
   
  }