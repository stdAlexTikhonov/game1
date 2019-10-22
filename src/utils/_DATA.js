let users = {
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
  
  let initState = {
    "8xf0y6ziyjabvozdd253nd": {
      id: "8xf0y6ziyjabvozdd253nd",
      text: "Shoutout to all the speakers I know for whom English is not a first language, but can STILL explain a concept well. It's hard enough to give a good talk in your mother tongue!",
      author: "sarah_edo",
      timestamp: 1518122597860,
      likes: ['tylermcginnis'],
      replies: ['fap8sdxppna8oabnxljzcv', '3km0v4hf1ps92ajf4z2ytg'],
      replyingTo: null,
    }
  }
  
  export function _getUsers () {
    return new Promise((res, rej) => {
      setTimeout(() => res({...users}), 1000)
    })
  }
  
  export function _getInitState () {
    return new Promise((res, rej) => {
      setTimeout(() => res({...initState}), 1000)
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
    return new Promise((res, rej) => {
      const formatted = format({
        text,
        author,
        replyingTo
      })
  
      setTimeout(() => {
        tweets = {
          ...tweets,
          [formatted.id]: formatted,
        }
  
        users = {
          ...users,
          [author]: {
            ...users[author],
            tweets: users[author].tweets.concat([formatted.id])
          }
        }
  
        res(formatted)
      }, 1000)
    })
  }